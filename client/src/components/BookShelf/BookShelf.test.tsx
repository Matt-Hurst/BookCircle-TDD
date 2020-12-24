import BookShelf from './BookShelf'
import { render, screen } from '@testing-library/react'
import { mockBooks } from '../../mocks/mocks'

describe('BookShelf component', () => {
  it('Should render correctly when no books provided', () => {
    render(<BookShelf />)
    expect(screen.getByText('no books on the shelf')).toBeInTheDocument()
  })
  it('Should render books when provided', () => { 
    render(<BookShelf books={mockBooks}/>)
    expect(screen.getAllByRole('img').length).toBe(mockBooks.length)
  })
})