import { Routes, Route } from 'react-router-dom'
import Navbar    from '../components/Navbar.jsx'
import Home      from '../pages/Home.jsx'
import Login     from '../pages/Login.jsx'
import Signup    from '../pages/Signup.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Profile   from '../pages/Profile.jsx'

function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/"          element={<Home />} />
        <Route path="/login"     element={<Login />} />
        <Route path="/signup"    element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile"   element={<Profile />} />
      </Routes>
    </>
  )
}

export default AppRoutes
