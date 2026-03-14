import { Link } from 'react-router-dom'

function Home() {
  const features = [
    { icon: '✅', text: 'Task CRUD'          },
    { icon: '🔍', text: 'Search & Filter'     },
    { icon: '🌙', text: 'Dark Mode'           },
    { icon: '📄', text: 'Pagination'          },
    { icon: '🔐', text: 'Secure Auth'         },
    { icon: '🔥', text: 'Streak Tracker'      },
    { icon: '🎯', text: 'Task Progress'       },
    { icon: '📝', text: 'Task Notes'          },
  ]

  return (
    <main className="page">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
          🚀 Hackathon Project · MERN Stack
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
          Manage tasks with{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-500">
            Planify
          </span>
        </h1>

        <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto mb-10">
          A modern full-stack productivity app. Create, track, and crush your tasks
          with smart search, drag-and-drop, and a built-in focus streak.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/signup" className="btn-primary px-8 py-3 text-base">
            Get started free →
          </Link>
          <Link to="/login" className="btn-secondary px-8 py-3 text-base">
            Log in
          </Link>
        </div>
      </section>

      {/* Feature pills */}
      <section className="max-w-3xl mx-auto px-4 pb-24">
        <div className="flex flex-wrap gap-3 justify-center">
          {features.map(({ icon, text }) => (
            <span
              key={text}
              className="flex items-center gap-1.5 badge bg-white dark:bg-gray-900
                         border border-gray-200 dark:border-gray-700
                         text-gray-700 dark:text-gray-300 px-4 py-2 text-sm
                         shadow-sm rounded-full font-medium"
            >
              {icon} {text}
            </span>
          ))}
        </div>
      </section>
    </main>
  )
}

export default Home
