import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../features/theme/ThemeContext'
import { AuthProvider } from '../features/auth/authContext'
import { TaskProvider } from '../features/tasks/taskContext'
import { Toaster } from 'react-hot-toast'
import ErrorBoundary from '../features/error/ErrorBoundary'
import AppRoutes from './routes'

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <TaskProvider>
            <Toaster position="bottom-right" toastOptions={{ className: 'dark:bg-gray-800 dark:text-white', style: { borderRadius: '10px', background: '#333', color: '#fff' } }} />
            <AppRoutes />
          </TaskProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App
