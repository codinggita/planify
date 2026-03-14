import { Link } from 'react-router-dom'
import SignupForm from '../features/auth/SignupForm'

function Signup() {
  return (
    <div className="page flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        <div className="card">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-4xl">✨</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mt-3">
              Create your account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Start managing tasks with Planify
            </p>
          </div>

          <SignupForm />

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-violet-600 dark:text-violet-400 font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup
