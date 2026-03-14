import { NavLink, Link } from 'react-router-dom'
import ThemeToggle from '../features/theme/ThemeToggle'

const NAV_LINKS = [
  { to: '/',          label: 'Home'      },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/profile',   label: 'Profile'   },
]

function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-violet-600 dark:text-violet-400">
          <span className="text-2xl">📋</span>
          <span>Planify</span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'bg-violet-50 dark:bg-violet-950 text-violet-600 dark:text-violet-400'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Right side — Theme toggle + auth buttons */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          {/* These will be replaced by user avatar after auth (Step 3) */}
          <Link to="/login"  className="btn-ghost text-sm">Login</Link>
          <Link to="/signup" className="btn-primary text-sm">Sign up</Link>
        </div>
      </div>
    </header>
  )
}

export default Navbar
