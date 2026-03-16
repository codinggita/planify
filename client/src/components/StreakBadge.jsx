import { useAuth } from '../features/auth/authContext'

export function StreakBadge() {
  const { user } = useAuth()

  // If user object doesn't exist, don't show badge
  if (!user) return null

  // Treat missing streak field as 0
  const streak = user.streak || 0

  return (
    <div 
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${
        streak > 0 
          ? 'bg-orange-50/80 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-400' 
          : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400'
      } transition-colors shadow-sm`}
      title={`${streak} Day Streak`}
    >
      <span className={`text-lg leading-none ${streak > 0 ? 'animate-pulse' : 'opacity-50 grayscale'}`}>
        🔥
      </span>
      <span className="font-bold text-sm tracking-wide">
        {streak}
      </span>
    </div>
  )
}
