import { Routes, Route } from 'react-router-dom'

import './App.css'

export const Home = () => {
  return <div data-testid="homeWrapper">Home</div>
}

const NotFound = () => {
  return (
    <div>
      404 <p>Page Not Found</p>
    </div>
  )
}

function App() {
  return (
    <>
      <div data-testid="appWrapper" className="App">
        Workout
      </div>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
