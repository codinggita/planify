import { createContext, useState, useEffect, useContext } from 'react'
import * as taskService from './taskService'
import { useAuth } from '../auth/authContext'

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
  
  const { user } = useAuth()

  // Fetch tasks automatically when a user logs in
  useEffect(() => {
    if (user) {
      fetchTasks()
    } else {
      setTasks([]) // Clear tasks on logout
      setPagination({ page: 1, pages: 1, total: 0 })
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
      setError(err.response?.data?.message || err.message)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (taskData) => {
    setLoading(true)
    try {
      const newTask = await taskService.createTask(taskData)
      setTasks([newTask, ...tasks])
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const editTask = async (taskId, taskData) => {
    try {
      const updatedTask = await taskService.updateTask(taskId, taskData)
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)))
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      return { success: false, error: err.message }
    }
  }

  const removeTask = async (taskId) => {
    try {
      await taskService.deleteTask(taskId)
      setTasks(tasks.filter((task) => task._id !== taskId))
      return { success: true }
    } catch (err) {
      setError(err.response?.data?.message || err.message)
      return { success: false, error: err.message }
    }
  }

  return (
    <TaskContext.Provider value={{ tasks, loading, error, fetchTasks, addTask, editTask, removeTask, setError }}>
      {children}
    </TaskContext.Provider>
  )
}
