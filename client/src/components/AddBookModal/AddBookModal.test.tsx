import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import AddBookModal from './AddBookModal'

const closeModalFunc = jest.fn()

describe('AddBookModal', () => {

  it('Should render', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc}/>)
    expect(screen.getByTestId('add-book-modal')).toBeInTheDocument()
  })
  it('Should execute closeModal function passed in via props when cross icon is clicked', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc}/>)
    const closeModalIcon = screen.getByTestId('close-modal-icon')
    fireEvent.click(closeModalIcon)
    expect(closeModalFunc).toHaveBeenCalledTimes(1)
  })
  it('Should render first screen', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc}/>)
    expect(screen.getByText('When did you read this book?')).toBeInTheDocument()
    expect(screen.getByTestId('date-input')).toBeInTheDocument()
  })
  it('Should change date value when date input is changed', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc}/>)
    const dateInput = screen.getByTestId('date-input')
    fireEvent.change(dateInput, { target: { value: '2020-05-12' } });
    expect(screen.getByDisplayValue('2020-05-12')).toBeInTheDocument()
  })
  // it('Should render second screen when "next" button is clicked', () => {
  //   render(<AddBookModal closeModalFunc={closeModalFunc}/>)
  //   const nextBtn = screen.getByText('next')
  // })
})