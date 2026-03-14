import { Link } from 'react-router-dom'

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

          {/* Form — wired to auth context in Step 3 */}
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="input"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="you@example.com"
                className="input"
                disabled
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Min. 8 characters"
                className="input"
                disabled
              />
            </div>

            <button type="button" className="btn-primary w-full mt-2" disabled>
              Create account — coming in Step 3
            </button>
          </form>

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
