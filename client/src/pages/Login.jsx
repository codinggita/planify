import { Link } from 'react-router-dom'
import LoginForm from '../features/auth/LoginForm'

function Login() {
  return (
    <div className="page flex flex-col items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-4xl">🔐</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sign in to your Planify account
            </p>
          </div>

          <LoginForm />

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      
      {/* Dev helper note */}
      <p className="mt-8 text-xs text-center text-gray-400">
        Demo tip: use any email and <strong className="font-mono">password123</strong> for testing.
      </p>
    </div>
  )
}

export default Login
