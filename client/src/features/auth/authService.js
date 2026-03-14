// Mock API service for Step 3 until Backend is built in Step 4

const MOCK_DELAY = 1000

const mockWait = () => new Promise(res => setTimeout(res, MOCK_DELAY))

export const signup = async (userData) => {
  await mockWait()
  
  if (!userData.email || !userData.password || !userData.name) {
    throw new Error('All fields are required')
  }

  // Simulate a successful signup response
  return {
    user: { id: 'usr_123', name: userData.name, email: userData.email },
    token: 'mock_jwt_token_12345'
  }
}

export const login = async (credentials) => {
  await mockWait()

  if (!credentials.email || !credentials.password) {
    throw new Error('Email and password required')
  }
  
  if (credentials.password !== 'password123') {
    throw new Error('Invalid credentials (use password123 for testing)')
  }

  // Simulate a successful login response
  return {
    user: { id: 'usr_123', name: 'Test User', email: credentials.email },
    token: 'mock_jwt_token_12345'
  }
}

export const getMe = async () => {
  await mockWait()
  
  const token = localStorage.getItem('planify-token')
  if (!token) throw new Error('Not authenticated')

  return { id: 'usr_123', name: 'Test User', email: 'test@example.com' }
}
