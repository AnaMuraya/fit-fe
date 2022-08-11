import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from './App'

// eslint-disable-next-line no-undef
test('renders learn react link', () => {
  render(<Home />)
  // eslint-disable-next-line no-undef
  expect(screen.getByTestId('homeWrapper')).toBeInTheDocument()
})
