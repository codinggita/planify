import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './authContext'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupSchema } from '../validation/schemas'

function SignupForm() {
  const { signup, loading, error: authError, clearError } = useAuth()
  const navigate = useNavigate()

  // Clear any existing errors when the component mounts
  useEffect(() => {
    clearError()
  }, [clearError])

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data) => {
    const res = await signup(data) // updated to pass object directly
    if (res.success) {
      navigate('/dashboard')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {authError && (
        <div className="bg-red-50 text-red-600 dark:bg-red-900/30 dark:text-red-400 p-3 rounded-lg text-sm">
          {authError}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Full Name
        </label>
        <input
          type="text"
          {...register('name')}
          placeholder="Alex Doe"
          className={`input ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          type="email"
          {...register('email')}
          placeholder="you@example.com"
          className={`input ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <input
          type="password"
          {...register('password')}
          placeholder="Min. 8 characters"
          className={`input ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full mt-2"
      >
        {loading ? 'Creating account...' : 'Create account'}
      </button>
    </form>
  )
}

export default SignupForm
