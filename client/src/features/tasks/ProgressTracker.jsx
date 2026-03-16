import { Trophy, Target, Zap } from 'lucide-react'
import { useTasks } from './taskContext'

export function ProgressTracker() {
  const { stats, loading } = useTasks()
  
  const total = stats?.totalTasks || 0
  const completed = stats?.completedTasks || 0
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0

  if (loading && total === 0) {
    return (
      <div className="bg-white dark:bg-gray-800/40 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 animate-pulse mb-8">
        <div className="h-4 w-1/4 bg-gray-100 dark:bg-gray-700 rounded mb-6"></div>
        <div className="h-10 w-full bg-gray-100 dark:bg-gray-700 rounded-2xl"></div>
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden bg-white dark:bg-gray-800/40 p-8 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm mb-12 group transition-all duration-500 hover:border-violet-200 dark:hover:border-violet-500/30">
      {/* Abstract Background Decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-violet-500/10 transition-colors"></div>
      
      <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-violet-50 dark:bg-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 shadow-inner">
            <Target size={28} />
          </div>
          <div>
            <h2 className="text-xl font-black text-gray-900 dark:text-white leading-tight">Your Progress</h2>
            <p className="text-sm font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pt-1">
              {completed} <span className="text-gray-300 dark:text-gray-700 mx-1">/</span> {total} Tasks Done
            </p>
          </div>
        </div>

        <div className="flex-1 max-w-md">
          <div className="flex justify-between items-end mb-3">
            <span className="text-[10px] font-black uppercase text-violet-600 dark:text-violet-400 tracking-tighter">Current Momentum</span>
            <span className="text-3xl font-black text-gray-900 dark:text-white tracking-tighter">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-100 dark:bg-gray-800/60 rounded-full h-4 p-1 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-violet-600 to-indigo-600 h-full rounded-full transition-all duration-1000 ease-out shadow-lg shadow-violet-500/20"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>
        </div>

        {percentage === 100 && total > 0 && (
          <div className="flex items-center gap-3 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-2 rounded-2xl border border-emerald-100 dark:border-emerald-500/20 animate-bounce">
            <Trophy size={18} className="text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">Goal Achieved!</span>
          </div>
        )}
      </div>
    </div>
  )
}
