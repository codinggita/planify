function Dashboard() {
  return (
    <div className="page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Tasks
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Your workspace — tasks, search, and filters will appear here
            </p>
          </div>
          <button className="btn-primary" disabled>
            + New Task
          </button>
        </div>

        {/* Placeholder grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="card animate-pulse"
            >
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-full mb-2" />
              <div className="h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3" />
            </div>
          ))}
        </div>

        <p className="text-center text-gray-400 dark:text-gray-600 mt-10 text-sm">
          🔒 Task CRUD will be implemented in Step 5 · Auth required (Step 2–4)
        </p>
      </div>
    </div>
  )
}

export default Dashboard
