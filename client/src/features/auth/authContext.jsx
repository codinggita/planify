import { createContext, useState, useEffect, useContext } from 'react'
import * as authService from './authService'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // On mount, check if there's a token and load user profile
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('planify-token')
        if (token) {
          const userData = await authService.getMe()
          setUser(userData)
        }
      } catch (err) {
        console.error('Auth initialization failed:', err)
        localStorage.removeItem('planify-token')
      } finally {
        setLoading(false)
      }
    }
    initAuth()
  }, [])

  const signup = async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const { user: newUser, token } = await authService.signup(userData)
      localStorage.setItem('planify-token', token)
      setUser(newUser)
      toast.success('Account created successfully!')
      return { success: true }
    } catch (err) {
      setError(err.message || 'Signup failed')
      toast.error(err.message || 'Signup failed')
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const { user: loggedInUser, token } = await authService.login(credentials)
      localStorage.setItem('planify-token', token)
      setUser(loggedInUser)
      toast.success('Welcome back!')
      return { success: true }
    } catch (err) {
      setError(err.message || 'Login failed')
      toast.error(err.message || 'Login failed')
      return { success: false, error: err.message }
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('planify-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, error, signup, login, logout, setError }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
