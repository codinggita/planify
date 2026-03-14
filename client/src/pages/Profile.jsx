function Profile() {
  return (
    <div className="page">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Profile
        </h1>

        {/* Avatar + info card */}
        <div className="card flex flex-col sm:flex-row items-center gap-6 mb-6">
          <div className="w-20 h-20 rounded-full bg-violet-100 dark:bg-violet-900/40
                          flex items-center justify-center text-3xl flex-shrink-0">
            👤
          </div>
          <div className="text-center sm:text-left">
            <p className="text-xl font-bold text-gray-900 dark:text-white">Your Name</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">you@example.com</p>
            <p className="text-xs text-gray-400 mt-1">Member since — loaded after auth (Step 2)</p>
          </div>
          <button className="ml-auto btn-secondary text-sm" disabled>
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
