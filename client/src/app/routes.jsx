import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar    from '../components/Navbar.jsx'
import Home      from '../pages/Home.jsx'
import Login     from '../pages/Login.jsx'
import Signup    from '../pages/Signup.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Profile   from '../pages/Profile.jsx'
import ProtectedRoute from '../components/ProtectedRoute.jsx'
import { useAuth } from '../features/auth/authContext'

function AppRoutes() {
  const { user } = useAuth()

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Public-only routes (redirect to dashboard if logged in) */}
          <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/dashboard" replace /> : <Signup />} />
          
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
             <Route path="/dashboard" element={<Dashboard />} />
             <Route path="/profile" element={<Profile />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  )
}

export default AppRoutes
