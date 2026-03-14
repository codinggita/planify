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

export const getTasks = async () => {
  const response = await axios.get(API_URL, getAuthHeaders())
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
