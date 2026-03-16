import { createContext, useState, useEffect, useContext, useCallback, useMemo } from 'react'
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
  const [isInitializing, setIsInitializing] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const clearError = useCallback(() => setError(null), [])

  const formatAuthError = (err) => {
    if (err.response) {
      const status = err.response.status
      const msg = err.response.data?.message

      if (status === 502 || status === 503) return 'Our server is temporarily unreachable. Please try again in a minute.'
      if (status === 500) return 'Something went wrong on our end. We are looking into it.'
      if (status === 401 && msg === 'Invalid email or password') return 'Incorrect email or password. Please try again.'
      if (status === 400 && msg === 'User already exists') return 'This email is already registered. Try logging in instead!'
      
      return msg || 'Authentication failed'
    }
    return err.message || 'Unable to connect to the server'
  }

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
        setIsInitializing(false)
      }
    }
    initAuth()
  }, [])

  const signup = useCallback(async (userData) => {
    setLoading(true)
    setError(null)
    try {
      const { user: newUser, token } = await authService.signup(userData)
      localStorage.setItem('planify-token', token)
      setUser(newUser)
      toast.success('Account created successfully!')
      return { success: true }
    } catch (err) {
      const msg = formatAuthError(err)
      setError(msg)
      toast.error(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [])

  const login = useCallback(async (credentials) => {
    setLoading(true)
    setError(null)
    try {
      const { user: loggedInUser, token } = await authService.login(credentials)
      localStorage.setItem('planify-token', token)
      setUser(loggedInUser)
      toast.success('Welcome back!')
      return { success: true }
    } catch (err) {
      const msg = formatAuthError(err)
      setError(msg)
      toast.error(msg)
      return { success: false, error: msg }
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('planify-token')
    setUser(null)
  }, [])

  const value = useMemo(() => ({ 
    user, 
    loading, 
    isInitializing, 
    error, 
    signup, 
    login, 
    logout, 
    clearError,
    setError 
  }), [user, loading, isInitializing, error, signup, login, logout, clearError])

  return (
    <AuthContext.Provider value={value}>
      {!isInitializing && children}
    </AuthContext.Provider>
  )
}
