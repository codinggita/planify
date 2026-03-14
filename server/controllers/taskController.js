import Task from '../models/Task.js'

// @desc    Get all tasks for the logged in user (with search, filter, sort)
// @route   GET /api/tasks
// @access  Private
export const getTasks = async (req, res) => {
  try {
    const { search, status, priority, sort } = req.query

    // Base query: only tasks belonging to user
    let query = { user: req.user.id }

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
      // Custom priority sorting will require aggregate or client-side sorting usually.
      // For simplicity, alphabetical sort on Priority (High -> Low -> Medium)
      sortObj = { priority: 1, createdAt: -1 } 
    }
    if (sort === 'dueDate') sortObj = { dueDate: 1, createdAt: -1 }

    const tasks = await Task.find(query).sort(sortObj)
    res.status(200).json(tasks)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, tags } = req.body

    if (!title) {
      return res.status(400).json({ message: 'Please add a title' })
    }

    const task = await Task.create({
      user: req.user.id,
      title,
      description,
      status,
      priority,
      dueDate,
      tags,
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
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to update this task' })
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })

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
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Not authorized to delete this task' })
    }

    await task.deleteOne()

    res.status(200).json({ id: req.params.id })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
