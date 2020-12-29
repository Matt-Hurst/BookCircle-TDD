import React from 'react'
import { screen, render, fireEvent, act } from '@testing-library/react'
import LoginForm from './LoginForm'

describe('LoginForm Component', () => {
  const handleSubmit = jest.fn()
  
  it('Should accept input into username', () => {
    render(<LoginForm handleSubmit={handleSubmit} />)
    act(() => {
      fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'someUsername'}
    })})
    expect(screen.getByDisplayValue('someUsername')).toBeInTheDocument();
  })
  it('Should accept input into password', () => {
    render(<LoginForm handleSubmit={handleSubmit}/>)
    act(() => {
      fireEvent.change(screen.getByTestId('password-input'), {
      target: { value: 'somePassword'}
    })})
    expect(screen.getByDisplayValue('somePassword')).toBeInTheDocument();
  })
  it('Should trigger submit function when button is clicked', () => {
    render(<LoginForm handleSubmit={handleSubmit}/>)
    act(() => {
      fireEvent.click(screen.getByText(/Log In/))
    expect(handleSubmit).toHaveBeenCalledTimes(1)
  })})
})
