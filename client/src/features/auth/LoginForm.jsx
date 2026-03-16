import { useEffect, useState } from 'react'
import { useAuth } from './authContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema } from '../validation/schemas'

export default function LoginForm() {
  const { login, loading, error: authError, clearError } = useAuth()
  
  // Clear any existing errors when the component mounts
  useEffect(() => {
    clearError()
  }, [clearError])
  
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    await login(data)
  }

  return (
    <div className="w-full max-w-md mx-auto card mt-8">
      <div className="mb-6">
         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h2>
         <p className="text-gray-500 dark:text-gray-400">Sign in to your account to manage your tasks.</p>
         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-md text-sm">
            <strong>Demo Credentials:</strong><br/>
            Email: user@example.com<br/>
            Pass: password123
         </div>
      </div>

      {authError && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 rounded-md text-sm">
          {authError}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="label">Email Address</label>
          <input
            type="email"
            {...register('email')}
            className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>

        <div>
           <div className="flex justify-between items-center">
              <label className="label">Password</label>
              <a href="#" className="text-sm font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400">Forgot password?</a>
           </div>
          <input
            type="password"
            {...register('password')}
            className={`input ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
            placeholder="••••••••"
          />
          {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="btn-primary w-full mt-2"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
