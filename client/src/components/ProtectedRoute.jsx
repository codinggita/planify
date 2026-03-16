import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../features/auth/authContext'
import Loader from './Loader'

export default function ProtectedRoute({ redirectPath = '/login', children }) {
  const { user, isInitializing } = useAuth()

  if (isInitializing) {
    return <Loader fullScreen />
  }

  if (!user) {
    return <Navigate to={redirectPath} replace />
  }

  return children ? children : <Outlet />
}
