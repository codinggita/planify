import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../features/theme/ThemeContext'
import { AuthProvider } from '../features/auth/authContext'
import { TaskProvider } from '../features/tasks/taskContext'
import AppRoutes from './routes.jsx'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <TaskProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TaskProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
