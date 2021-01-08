import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'

import UserBookModal from './UserBookModal'
import { mockBooks } from '../../mocks'

describe('UserBookModal', () => {
  const mockBook = mockBooks[0]
  const closeModal = jest.fn()
  const editBook = jest.fn()

  it('Should render', () => {
    render(<UserBookModal book={mockBook} closeModal={closeModal} editBook={editBook}/>)
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByText(mockBook.title)).toBeInTheDocument()
    expect(screen.getByText(mockBook.genre)).toBeInTheDocument()
    expect(screen.getByText(mockBook.genre)).toBeInTheDocument()
    expect(screen.getByText(`read ${mockBook.dateRead}`)).toBeInTheDocument()
    expect(screen.getByText(/available to borrow/)).toBeInTheDocument()
    const review = mockBook.review
    expect(screen.getByText(`Review: ${review}`)).toBeInTheDocument()
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByTestId('greyed-background-div')).toBeInTheDocument()
  })
  it('Should call closeModal when close button is clicked', () => {
    render(<UserBookModal book={mockBook} closeModal={closeModal} editBook={editBook}/>)
    fireEvent.click(screen.getByTestId('close-button'))
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
  it('Should call closeModal when greyed out background div is clicked', () => {
    render(<UserBookModal book={mockBook} closeModal={closeModal} editBook={editBook}/>)
    fireEvent.click(screen.getByTestId('greyed-background-div'))
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
  it('Should call handleClick function when edit book button is clicked', () => {
    render(<UserBookModal book={mockBook} closeModal={closeModal} editBook={editBook}/>)
    expect(screen.queryByText(/Update Book/)).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByText(/Update Book/)).toBeInTheDocument()
  })
})