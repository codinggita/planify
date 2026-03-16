export default function Loader({ fullScreen = false }) {
  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative w-16 h-16">
        {/* Outer ring */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-violet-100 dark:border-violet-900/30 rounded-full"></div>
        {/* Spinning arc */}
        <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-violet-600 rounded-full animate-spin"></div>
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 animate-pulse">
        Setting things up for you...
      </p>
    </div>
  )

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[999] bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
        {loaderContent}
      </div>
    )
  }

  return <div className="p-8">{loaderContent}</div>
}
