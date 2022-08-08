import { Routes, Route } from 'react-router-dom'

import './App.css'

export const Home = () => {
  return <div data-testid='homeWrapper'>Home</div>
}

function App() {
  return (
    <div data-testid='appWrapper' className='App'>
      Workout
      <Routes>
        <Route path='/home' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App
