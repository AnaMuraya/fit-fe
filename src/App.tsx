import { Routes, Route } from 'react-router-dom'

import { Weather, Dashboard, Auth } from './pages'

import './App.css'

export const Home = () => {
  return <div data-testid="homeWrapper">Home</div>
}

function App() {
  return (
    <div data-testid="appWrapper" className="App">
      Workout
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
