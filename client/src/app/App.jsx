import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '../features/theme/ThemeContext'
import AppRoutes from './routes.jsx'

function App() {
  return (
    // ThemeProvider wraps everything so dark mode works globally
    // AuthProvider will be added here in Step 3
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
