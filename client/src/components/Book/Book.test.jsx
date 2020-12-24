import { fireEvent, render } from '@testing-library/react'
import BookDisplay from './Book'
import { screen } from '@testing-library/react'

describe('Book component', () => {

  const mockBook = {
    imgUrl: 'http://books.google.com/books/content?id=5AwIEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
  } 

  it('Should render', () => {
    render(<BookDisplay book={mockBook} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
  it('Should trigger function passed down through props onClick', () => {
    const handleClick = jest.fn()
    render(<BookDisplay book={mockBook} handleClick={handleClick} />)
    fireEvent.click(screen.getByRole('img'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})