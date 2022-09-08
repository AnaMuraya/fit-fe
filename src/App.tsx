import { Routes, Route, Outlet } from 'react-router-dom'

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

function App() {
  return (
    <Routes>
      <Route element={<PageLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminBoard />} />
        <Route path="/user" element={<UserBoard/>} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
