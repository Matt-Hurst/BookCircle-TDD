import BookShelf from './BookShelf'
import { render, screen } from '@testing-library/react'
import { mockBooks } from '../../mocks'

const handleClick = jest.fn()

describe('BookShelf component', () => {
  it('Should render correctly when no books provided', () => {
    render(<BookShelf handleClick={handleClick} />)
    expect(screen.getByText('no books on the shelf')).toBeInTheDocument()
  })
  it('Should render books when provided', () => { 
    render(<BookShelf books={mockBooks} handleClick={handleClick}/>)
    expect(screen.getAllByRole('img').length).toBe(mockBooks.length)
  })
})