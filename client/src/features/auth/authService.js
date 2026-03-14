import axios from 'axios'

const API_URL = '/api/auth/'

// Register user
export const signup = async (userData) => {
  const response = await axios.post(API_URL + 'signup', userData)
  return response.data
}

// Login user
export const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData)
  return response.data
}

// Get user profile
export const getMe = async () => {
  const token = localStorage.getItem('planify-token')
  if (!token) throw new Error('No token found')

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL + 'me', config)
  return response.data
}
