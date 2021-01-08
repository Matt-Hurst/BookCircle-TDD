import React from 'react'
import { render, screen } from '@testing-library/react'
import WordCloud from './WordCloud'
import { mockBooks } from '../../mocks'

describe('WordCloud component', () => {

  it('should render', () => {
    render(<WordCloud books={mockBooks}/>)
    expect(screen.getByTestId('word-cloud-wrapper')).toBeInTheDocument()
  })
})