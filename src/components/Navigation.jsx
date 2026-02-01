import { Link, useLocation } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

function Navigation() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()

  const isActive = (path) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-blue-600 dark:bg-gray-800 text-white shadow-md transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80">
            <div className="bg-white rounded-full w-10 h-10 flex items-center justify-center text-2xl">
              📧
            </div>
            <div>
              <div className="font-bold text-lg">Relay AI</div>
              <div className="text-xs text-blue-200 dark:text-blue-400">Customer Triage</div>
            </div>
          </Link>

          {/* Navigation Links and Theme Toggle */}
          <div className="flex items-center space-x-4">
            <div className="flex space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded ${isActive('/')
                    ? 'bg-blue-700 dark:bg-gray-700 font-semibold'
                    : 'hover:bg-blue-500 dark:hover:bg-gray-700'
                  }`}
              >
                Home
              </Link>
              <Link
                to="/analyze"
                className={`px-4 py-2 rounded ${isActive('/analyze')
                    ? 'bg-blue-700 dark:bg-gray-700 font-semibold'
                    : 'hover:bg-blue-500 dark:hover:bg-gray-700'
                  }`}
              >
                Analyze
              </Link>
              <Link
                to="/history"
                className={`px-4 py-2 rounded ${isActive('/history')
                    ? 'bg-blue-700 dark:bg-gray-700 font-semibold'
                    : 'hover:bg-blue-500 dark:hover:bg-gray-700'
                  }`}
              >
                History
              </Link>
              <Link
                to="/dashboard"
                className={`px-4 py-2 rounded ${isActive('/dashboard')
                    ? 'bg-blue-700 dark:bg-gray-700 font-semibold'
                    : 'hover:bg-blue-500 dark:hover:bg-gray-700'
                  }`}
              >
                Dashboard
              </Link>
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-blue-500 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {theme === 'light' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 9H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
