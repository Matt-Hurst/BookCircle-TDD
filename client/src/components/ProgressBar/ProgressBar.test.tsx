import React from 'react';
import { render, screen } from '@testing-library/react';
import ProgressBar from './ProgressBar'

it('renders correctly', () => {
  render(<ProgressBar completed={70} />)
  screen.debug()
  expect(screen.getByText('70%')).toBeInTheDocument()
})