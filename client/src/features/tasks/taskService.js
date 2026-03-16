import axios from 'axios'

const API_URL = '/api/tasks/'

const getAuthHeaders = () => {
  const token = localStorage.getItem('planify-token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

export const getTasks = async (queryParams = {}) => {
  // Build query string from object
  const queryString = new URLSearchParams(
    Object.entries(queryParams).filter(([_, v]) => v) // filter out empty values
  ).toString()

  const url = queryString ? `${API_URL}?${queryString}` : API_URL
  
  const response = await axios.get(url, getAuthHeaders())
  return response.data
}

export const createTask = async (taskData) => {
  const response = await axios.post(API_URL, taskData, getAuthHeaders())
  return response.data
}

export const updateTask = async (taskId, taskData) => {
  const response = await axios.put(API_URL + taskId, taskData, getAuthHeaders())
  return response.data
}

export const deleteTask = async (taskId) => {
  const response = await axios.delete(API_URL + taskId, getAuthHeaders())
  return response.data
}

export const getTaskStats = async () => {
  const response = await axios.get(API_URL + 'stats', getAuthHeaders())
  return response.data
}

export const getGlobalStats = async () => {
  const response = await axios.get('/api/tasks/public/stats')
  return response.data
}

export const getRecentActivity = async () => {
  const response = await axios.get('/api/activity', getAuthHeaders())
  return response.data
}
