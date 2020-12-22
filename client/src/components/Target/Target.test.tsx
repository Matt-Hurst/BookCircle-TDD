import React from 'react';
import { render, screen } from '@testing-library/react';
import { Target } from './Target';

describe('Target', () => {
  it('if no goal set renders set goal prompt', () => {
    render(<Target />);
    expect(screen.getByText('no goals set, why not set one?')).toBeInTheDocument()
  })
  it('if goal set renders goal display content', () => {
    render(<Target />)
  })
})
