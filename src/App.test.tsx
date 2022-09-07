import { render, screen } from '@testing-library/react'
import { NotFound } from './App'

// eslint-disable-next-line no-undef
test('renders home', () => {
  render(<NotFound />)
  // eslint-disable-next-line no-undef
  expect(screen.getByTestId('wrapper')).toBeInTheDocument()
  screen.debug()
})

// test('renders app', () => {
//   render(<App />)
//   expect(screen.getByTestId('appWrapper')).toBeInTheDocument()
//   screen.debug()
// })
