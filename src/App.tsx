import { Routes, Route, Outlet, Link } from 'react-router-dom'

import {
  Weather,
  Dashboard,
  Login,
  Register,
  Profile,
  Home,
  AdminBoard,
  UserBoard
} from './pages'
import { Navbar } from './components'

import './App.css'

const PageLayout = () => {
  return (
    <div className="wrapper">
      <Navbar />
      <Outlet />
    </div>
  )
}

export const NotFound = () => {
  return (
    <div data-testid="wrapper">
      404 <p>NotFound</p>
    </div>
  )
}

const Logout = () => {
  return (
    <div>
      You have been logged out <Link to="/signin">Do you want to log in</Link>{' '}
    </div>
  )
}

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminBoard />} />
        <Route path="/user" element={<UserBoard />} />
      </Route>
      <Route path="/signin" element={<Login />} />
      <Route path="/signup" element={<Register />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
