import { useAuth } from '../features/auth/authContext'

function Profile() {
  const { user } = useAuth()

  if (!user) return null // Handled by routing later

  return (
    <div className="page flex flex-col items-center">
      <div className="w-full max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile
        </h1>

        {/* Avatar + info card */}
        <div className="card flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/40
                          flex items-center justify-center text-3xl font-bold text-violet-700 dark:text-violet-300 flex-shrink-0">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold text-gray-900 dark:text-white">{user.name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
            <p className="text-xs text-gray-400 mt-1">Logged in</p>
          </div>
          <button className="sm:ml-auto mt-4 sm:mt-0 btn-secondary text-sm" disabled>
            Edit Profile
          </button>
        </div>

        {/* Stats placeholder */}
        <div className="grid grid-cols-2 gap-4">
          <div className="card text-center">
            <p className="text-3xl font-extrabold text-violet-600 dark:text-violet-400">0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Tasks Completed</p>
          </div>
          <div className="card text-center">
            <p className="text-3xl font-extrabold text-orange-500">🔥 0</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Day Streak</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
