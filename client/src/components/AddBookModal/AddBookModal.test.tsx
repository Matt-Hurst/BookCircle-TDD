import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import AddBookModal from './AddBookModal'

const closeModalFunc = jest.fn()
const addBookFunction = jest.fn()

describe('AddBookModal', () => {

  it('Should render', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    expect(screen.getByTestId('add-book-modal')).toBeInTheDocument()
  })
  it('Should execute closeModal function passed in via props when cross icon is clicked', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    const closeModalIcon = screen.getByTestId('close-modal-icon')
    fireEvent.click(closeModalIcon)
    expect(closeModalFunc).toHaveBeenCalledTimes(1)
  })
  it('Should render first screen', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    expect(screen.getByText('When did you read this book?')).toBeInTheDocument()
    expect(screen.getByTestId('date-input')).toBeInTheDocument()
  })
  it('Should change date value when date input is changed', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    const dateInput = screen.getByTestId('date-input')
    fireEvent.change(dateInput, { target: { value: '2020-05-12' } });
    expect(screen.getByDisplayValue('2020-05-12')).toBeInTheDocument()
  })
  it('Should render second prompt when "next" button is clicked', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    const nextBtn = screen.getByRole('button',{name:'next'})
    nextBtn.click()
    expect(screen.getByText('What did you think?')).toBeInTheDocument()
  })
  // TODO: HOW TO TEST TEXTAREA ELEMENT
  // it('Should not allow user to move to third prompt when review has not been inputed', () => {
  //   render(<AddBookModal closeModalFunc={closeModalFunc}/>)
  //   const nextBtn = screen.getByText('next')
  //   nextBtn.click()
  //   expect(screen.getByText('What did you think?')).toBeInTheDocument()
  //   nextBtn.click()
  //   expect(screen.getByText('What did you think?')).toBeInTheDocument()
  // })
  it('Should render first prompt when back button clicked in second promot', async () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction} />)
    const nextBtn = screen.getByRole('button',{name:'next'})
    nextBtn.click()
    expect(screen.getByText('What did you think?')).toBeInTheDocument()
    const previousButton = screen.getByRole('button',{name: 'back'})
    previousButton.click()
    expect(screen.getByText('When did you read this book?')).toBeInTheDocument()
  })
  it('Should not render back button when on first prompt', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    expect(screen.queryByText('back')).toBeNull()
  })
  it('Should render first, second, third, fourth, and fifth prompt', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    const nextBtn = screen.getByRole('button',{name:'next'})
    nextBtn.click()
    expect(screen.getByText('What did you think?')).toBeInTheDocument()
    nextBtn.click()
    expect(screen.getByText('Can you lend this book?')).toBeInTheDocument()
    nextBtn.click()
    expect(screen.getByText('What genre is this book?')).toBeInTheDocument()
    nextBtn.click()
    expect(screen.getByText('Is this book a must read?')).toBeInTheDocument()
  })
  it('Should render add book button on fifth prompt, and submit addBookFunction onClick, then closeModalFunc is called', () => {
    render(<AddBookModal closeModalFunc={closeModalFunc} addBookFunction={addBookFunction}/>)
    const nextBtn = screen.getByRole('button',{name:'next'})
    nextBtn.click()
    nextBtn.click()
    nextBtn.click()
    nextBtn.click()
    const addBookButton = screen.getByRole('button', {name: 'add book'})
    expect(addBookButton).toBeInTheDocument()
    addBookButton.click()
    expect(addBookFunction).toHaveBeenCalledTimes(1)
    expect(closeModalFunc).toHaveBeenCalledTimes(1)
  })
})