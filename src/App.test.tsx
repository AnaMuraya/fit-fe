import { render, screen } from '@testing-library/react'
import { Home } from './App'

// eslint-disable-next-line no-undef
test('renders home', () => {
  render(<Home />)
  // eslint-disable-next-line no-undef
  expect(screen.getByTestId('homeWrapper')).toBeInTheDocument()
  screen.debug()
})

// test('renders app', () => {
//   render(<App />)
//   expect(screen.getByTestId('appWrapper')).toBeInTheDocument()
//   screen.debug()
// })
