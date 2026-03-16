import Task from '../models/Task.js'
import Activity from '../models/Activity.js'

// @desc    Get all tasks for the logged in user (with search, filter, sort, pagination)
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const { search, status, priority, sort, pageNumber, limit: queryLimit } = req.query

    // Pagination logic
    const page = Number(pageNumber) || 1
    const limit = Number(queryLimit) || 9 // Default 9 items per page

    const skip = (page - 1) * limit

    // Base query: only tasks belonging to user
    let query = { user: req.user._id }

    // Search by title or description (regex, case-insensitive)
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ]
    }

    // Exact match filters
    if (status) query.status = status
    if (priority) query.priority = priority

    // Default sorting (newest first)
    let sortObj = { createdAt: -1 }

    if (sort === 'oldest') sortObj = { createdAt: 1 }
    if (sort === 'priority') {
      sortObj = { priority: 1, createdAt: -1 } 
    }
    if (sort === 'dueDate') sortObj = { dueDate: 1, createdAt: -1 }

    // Count total documents matching query (for pagination math)
    const count = await Task.countDocuments(query)

    // Await find with pagination
    const tasks = await Task.find(query)
      .sort(sortObj)
      .limit(limit)
      .skip(skip)

    res.status(200).json({
      tasks,
      page,
      pages: Math.ceil(count / limit),
      total: count,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, notes, status, priority, dueDate, tags } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Please add a title' })
    }

    const task = await Task.create({
      user: req.user._id,
      title,
      description,
      notes,
      status,
      priority,
      dueDate,
      tags,
    })

    // Log Activity
    await Activity.create({
      user: req.user._id,
      action: 'CREATED_TASK',
      taskTitle: task.title,
    })

    res.status(201).json(task)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to update this task' })
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

    // Log Activity if status changed
    if (req.body.status && req.body.status !== task.status) {
      if (req.body.status === 'Done') {
        await Activity.create({
          user: req.user._id,
          action: 'COMPLETED_TASK',
          taskTitle: task.title,
        })
      } else if (req.body.status === 'In Progress') {
        await Activity.create({
          user: req.user._id,
          action: 'STARTED_TASK',
          taskTitle: task.title,
        })
      }
    }

    res.status(200).json(updatedTask)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)

    if (!task) {
      return res.status(404).json({ message: 'Task not found' })
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized to delete this task' })
    }

    await task.deleteOne()

    // Log Activity
    await Activity.create({
      user: req.user._id,
      action: 'DELETED_TASK',
      taskTitle: task.title, // Use original title, it's safe since it's already fetched
    })

    res.status(200).json({ id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get global statistics for the platform (public)
// @route   GET /api/tasks/public/stats
// @access  Public
export const getGlobalStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({})
    const completedTasks = await Task.countDocuments({ status: 'Done' })
    
    // Calculate a mock growth percentage based on total tasks for visual flair
    // but the count itself is real.
    const growth = totalTasks > 0 ? ((completedTasks / totalTasks) * 100).toFixed(1) : 0

    res.status(200).json({ totalTasks, completedTasks, growth })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Get task statistics for the user
// @route   GET /api/tasks/stats
// @access  Private
export const getTaskStats = async (req, res) => {
  try {
    const totalTasks = await Task.countDocuments({ user: req.user._id })
    const completedTasks = await Task.countDocuments({ user: req.user._id, status: 'Done' })
    
    res.status(200).json({ totalTasks, completedTasks })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
