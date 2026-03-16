import { NavLink, Link, useNavigate } from 'react-router-dom'
import ThemeToggle from '../features/theme/ThemeToggle'
import { useAuth } from '../features/auth/authContext'
import { StreakBadge } from './StreakBadge'

const NAV_LINKS = [
  { to: '/',          label: 'Home'      },
  { to: '/dashboard', label: 'Dashboard' },
]

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

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

        {/* Right side — Theme toggle + Auth */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          
          {user ? (
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200 dark:border-gray-700">
              <StreakBadge />
              <Link to="/profile" className="flex items-center justify-center w-8 h-8 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 font-bold text-sm" title="Profile">
                {user.name.charAt(0).toUpperCase()}
              </Link>
              <button onClick={handleLogout} className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-300">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link to="/login"  className="btn-ghost text-sm">Login</Link>
              <Link to="/signup" className="btn-primary text-sm">Sign up</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

export default Navbar
