import { screen, fireEvent, render } from '@testing-library/react'
import { mockBooks } from '../../mocks'
import BookDisplay from './Book'

describe('Book component', () => {

  const handleClick = jest.fn()

  it('Should render', () => {
    render(<BookDisplay book={mockBooks[0]} handleClick={handleClick} />)
    expect(screen.getByRole('img')).toBeInTheDocument()
  })
  it('Should trigger function passed down through props onClick', () => {
    render(<BookDisplay book={mockBooks[0]} handleClick={handleClick} />)
    fireEvent.click(screen.getByRole('img'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})