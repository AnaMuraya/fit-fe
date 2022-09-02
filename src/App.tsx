import { Routes, Route } from 'react-router-dom'

import { Weather, Dashboard, Login, Register } from './pages'

// import './App.css'

export const Home = () => {
  return <div data-testid="homeWrapper">Home</div>
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
      <Route path="api/auth/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/weather" element={<Weather />} />
      <Route path="/api/auth/signin" element={<Login />} />
      <Route path="api/auth/signup" element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    // </div>
  )
}

export default App
