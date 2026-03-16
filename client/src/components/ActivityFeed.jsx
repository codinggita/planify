import { useState, useEffect } from 'react'
import { getRecentActivity } from '../features/tasks/taskService'

export function ActivityFeed() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // We could also move this to Context depending on app size,
  // but since it's only on Dashboard, fetching here is fine for now.
  useEffect(() => {
    const fetchActivity = async () => {
      try {
        const data = await getRecentActivity()
        setActivities(data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load activity')
      } finally {
        setLoading(false)
      }
    }

    fetchActivity()
  }, []) // Empty dependency array: fetches once on mount

  const getActivityIcon = (action) => {
    switch (action) {
      case 'CREATED_TASK':
        return '✨'
      case 'STARTED_TASK':
        return '⏳'
      case 'COMPLETED_TASK':
        return '✅'
      case 'DELETED_TASK':
        return '🗑️'
      default:
        return '📝'
    }
  }

  const getActivityMessage = (activity) => {
    switch (activity.action) {
      case 'CREATED_TASK':
        return <span>Created <strong>{activity.taskTitle}</strong></span>
      case 'STARTED_TASK':
        return <span>Started working on <strong>{activity.taskTitle}</strong></span>
      case 'COMPLETED_TASK':
        return <span>Completed <strong>{activity.taskTitle}</strong></span>
      case 'DELETED_TASK':
        return <span>Deleted <strong>{activity.taskTitle}</strong></span>
      default:
        return <span>Updated <strong>{activity.taskTitle}</strong></span>
    }
  }

  // Format date relative (e.g., "2 hours ago", or actual string if older)
  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now - date
    const diffMins = Math.round(diffMs / 60000)
    
    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    
    const diffHours = Math.round(diffMins / 60)
    if (diffHours < 24) return `${diffHours}h ago`
    
    const diffDays = Math.round(diffHours / 24)
    if (diffDays < 7) return `${diffDays}d ago`
    
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="card w-full mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Activity History</h3>
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-10 w-10"></div>
          <div className="flex-1 space-y-4 py-1">
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="card w-full mb-6 py-4 px-6 border-l-4 border-red-500 bg-red-50 dark:bg-red-900/10">
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  return (
    <div className="card w-full mb-6">
      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">Activity History</h3>
      
      {activities.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-400 italic">No recent activity.</p>
      ) : (
        <div className="relative border-l border-gray-200 dark:border-gray-700/50 ml-3 md:ml-4 space-y-6 lg:space-y-8">
          {activities.map((activity) => (
            <div key={activity._id} className="relative pl-6">
              {/* Timeline dot/icon */}
              <span className="absolute flex items-center justify-center w-8 h-8 bg-gray-50 rounded-full -start-4 ring-8 ring-white dark:ring-gray-900 dark:bg-gray-800 text-sm">
                {getActivityIcon(activity.action)}
              </span>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between px-2 pt-1.5 gap-1">
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  {getActivityMessage(activity)}
                </p>
                <time className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                  {formatTimeAgo(activity.createdAt)}
                </time>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
