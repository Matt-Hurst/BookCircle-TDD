import Login from './Login'
import { render, screen } from '@testing-library/react'

describe('Login page', () => {

  it('Should render correctly', () => {
    render(<Login />)
    expect(screen.getByText('the Book Circle')).toBeInTheDocument()
  })
  it('Should render the LoginForm component correctly', () => {
    render(<Login />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})