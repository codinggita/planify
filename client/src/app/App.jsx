import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../features/theme/ThemeContext'
import { AuthProvider } from '../features/auth/authContext'
import AppRoutes from './routes.jsx'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
