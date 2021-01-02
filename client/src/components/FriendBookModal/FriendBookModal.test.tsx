import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { mockBooks } from '../../mocks'
import FriendBookModal from './FriendBookModal'

describe('FriendBookModal', () => {

  const closeModal = jest.fn()
  const requestBook = jest.fn()

  it('Should render correctly', () => {
    render(<FriendBookModal book={mockBooks[0]} closeModal={closeModal} requestBook={requestBook}/>)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
  it('Should trigger closeModal function when cross icon is clicked', () => {
    render(<FriendBookModal book={mockBooks[0]} closeModal={closeModal} requestBook={requestBook}/>)
    fireEvent.click(screen.getByTestId('closeSVG'))
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
  it('Should trigger closeModal function when greyedOutDiv is clicked', () => {
    render(<FriendBookModal book={mockBooks[0]} closeModal={closeModal} requestBook={requestBook}/>)
    fireEvent.click(screen.getByTestId('greyedBackgroundDiv'))
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
  it('Should render "request book" button if book is available to borrow', () => {
    const bookProp = mockBooks[0]
    bookProp.availableToBorrow = true
    render(<FriendBookModal book={bookProp} closeModal={closeModal} requestBook={requestBook}/>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  it('Should not render "request book" button if book is not available to borrow', () => {
    const bookProp = mockBooks[0]
    bookProp.availableToBorrow = false
    render(<FriendBookModal book={bookProp} closeModal={closeModal} requestBook={requestBook}/>)
    expect(screen.queryByRole('button')).toBeNull()
  })
  it('Should execute requestBook function if "request book" button is clicked', () => {
    const bookProp = mockBooks[0]
    bookProp.availableToBorrow = true
    render(<FriendBookModal book={bookProp} closeModal={closeModal} requestBook={requestBook}/>)
    fireEvent.click(screen.getByRole('button'))
    expect(requestBook).toHaveBeenCalledTimes(1)
  })
  // it('Should  trigger closeModal function if "request book" button is clicked', async () => {
  //   const bookProp = mockBooks[0]
  //   bookProp.availableToBorrow = true
  //   render(<FriendBookModal book={bookProp} closeModal={closeModal} requestBook={requestBook}/>)
  //   fireEvent.click(screen.getByRole('button'))
  //   expect(await closeModal).toHaveBeenCalledTimes(1)
  // })
})



