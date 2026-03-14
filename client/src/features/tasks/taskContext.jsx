import { createContext, useState, useEffect, useContext } from 'react'
import * as taskService from './taskService'
import { useAuth } from '../auth/authContext'
import toast from 'react-hot-toast'

export const TaskContext = createContext()

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used within a TaskProvider')
  return context
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0 })
  
  const { user } = useAuth()

  // Fetch tasks automatically when a user logs in
  useEffect(() => {
    if (user) {
      fetchTasks()
      fetchTaskStats()
    } else {
      setTasks([]) // Clear tasks on logout
      setPagination({ page: 1, pages: 1, total: 0 })
      setStats({ totalTasks: 0, completedTasks: 0 })
    }
  }, [user])

  const fetchTasks = async (filters = {}) => {
    setLoading(true)
    try {
      const data = await taskService.getTasks(filters)
      setTasks(data.tasks || []) // Extract tasks array
      setPagination({
        page: data.page || 1,
        pages: data.pages || 1,
        total: data.total || 0
      })
    } catch (err) {
      const msg = err.response?.data?.message || err.message
      setError(msg)
      toast.error(`Failed to load tasks: ${msg}`)
    } finally {
      setLoading(false)
    }
  }

  const fetchTaskStats = async () => {
    try {
      const data = await taskService.getTaskStats()
      setStats(data)
    } catch (err) {
      console.error('Failed to fetch task stats:', err)
    }
  }

  const addTask = async (taskData) => {
    setLoading(true)
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks([newTask, ...tasks])
      toast.success('Task created successfully')
      fetchTaskStats() // Update stats
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || err.message
      setError(msg)
      toast.error(`Failed to create task: ${msg}`)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const editTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData)
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)))
      toast.success('Task updated successfully')
      fetchTaskStats() // Update stats
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || err.message
      setError(msg)
      toast.error(`Failed to update task: ${msg}`)
      return { success: false, error: err.message }
    }
  }

  const updateTaskStatus = async (taskId, newStatus) => {
    // Optimistic UI update for snappy drag and drop
    const previousTasks = [...tasks]
    setTasks(tasks.map((task) => (task._id === taskId ? { ...task, status: newStatus } : task)))

    try {
      await taskService.updateTask(taskId, { status: newStatus })
      fetchTaskStats() // Update stats
      return { success: true }
    } catch (err) {
      // Revert on error
      setTasks(previousTasks)
      const msg = err.response?.data?.message || err.message
      toast.error(`Failed to move task: ${msg}`)
      return { success: false, error: err.message }
    }
  }

  const removeTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(tasks.filter((task) => task._id !== taskId))
      toast.success('Task deleted')
      fetchTaskStats() // Update stats
      return { success: true }
    } catch (err) {
      const msg = err.response?.data?.message || err.message
      setError(msg)
      toast.error(`Failed to delete task: ${msg}`)
      return { success: false, error: err.message }
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, stats, loading, error, fetchTasks, fetchTaskStats, addTask, editTask, updateTaskStatus, removeTask, setError }}>
      {children}
    </TaskContext.Provider>
  )
}
