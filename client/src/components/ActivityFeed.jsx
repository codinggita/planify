import { useState, useEffect } from 'react'
import { PlusCircle, PlayCircle, CheckCircle2, Trash2, History, MessageSquareText } from 'lucide-react'
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
        return <PlusCircle size={14} className="text-violet-500" />
      case 'STARTED_TASK':
        return <PlayCircle size={14} className="text-blue-500" />
      case 'COMPLETED_TASK':
        return <CheckCircle2 size={14} className="text-emerald-500" />
      case 'DELETED_TASK':
        return <Trash2 size={14} className="text-red-500" />
      default:
        return <MessageSquareText size={14} className="text-gray-500" />
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
    <div className="bg-white dark:bg-gray-800/40 border border-gray-100 dark:border-gray-800 p-6 rounded-3xl transition-all duration-300">
      <div className="flex items-center gap-2 mb-8">
        <History size={18} className="text-violet-600 dark:text-violet-400" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white uppercase tracking-wider">Activity History</h3>
      </div>
      
      {activities.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <History size={40} className="text-gray-200 dark:text-gray-700 mb-2 opacity-50" />
          <p className="text-sm text-gray-400 dark:text-gray-500 font-medium italic">No recent activity detected.</p>
        </div>
      ) : (
        <div className="relative border-l-2 border-gray-100 dark:border-gray-800 ml-3 space-y-10 pb-4">
          {activities.map((activity) => (
            <div key={activity._id} className="relative pl-8">
              {/* Timeline dot/icon */}
              <span className="absolute flex items-center justify-center w-8 h-8 bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 rounded-xl -start-[17px] ring-4 ring-white dark:ring-gray-900 shadow-sm transition-transform hover:scale-110">
                {getActivityIcon(activity.action)}
              </span>
              
              <div className="flex flex-col gap-1">
                <p className="text-sm font-bold text-gray-800 dark:text-gray-200 leading-tight">
                  {getActivityMessage(activity)}
                </p>
                <time className="text-[10px] font-black uppercase text-gray-400 dark:text-gray-500 tracking-widest flex items-center gap-1.5 pt-1">
                  <span className="w-1 h-1 bg-gray-300 dark:bg-gray-700 rounded-full"></span>
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
