import React from 'react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error('ErrorBoundary caught an error', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-dark-bg p-4 text-center">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-100 dark:border-gray-700">
            <span className="text-6xl text-red-500 block mb-6">⚠️</span>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Oops! Something went wrong.</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-6 text-sm">
              We're sorry, but an unexpected error occurred. Our team has been notified.
            </p>
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg text-left text-xs mb-6 overflow-auto max-h-32">
              <code className="break-all">{this.state.error?.toString()}</code>
            </div>
            <button
              onClick={() => window.location.replace('/')}
              className="btn-primary w-full"
            >
              Refresh Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children 
  }
}

export default ErrorBoundary
