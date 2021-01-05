import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'

import EditBookModal from './EditBookModal'
import { mockBooks } from '../../mocks'
import userEvent from '@testing-library/user-event'

const book = mockBooks[0]
const closeEdit = jest.fn()
const editBook = jest.fn()

describe('Edit Book Modal', () => {

  it('Should render', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    expect(screen.getByText(/Update Book/)).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByText(/Star read/)).toBeInTheDocument()
  })
  it('Should set current book values upon render', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    expect(screen.getByText(book.review)).toBeInTheDocument()
    expect(screen.getByDisplayValue(book.dateRead)).toBeInTheDocument()
  })
  it('Should change review text when user changes review', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    const additionalReview = ' additional review content'
    const review = screen.getByRole('textbox')
    userEvent.type(review, additionalReview)
    expect(screen.getByText(/additional review content/)).toBeInTheDocument()
  })
  it('Should change dateRead when user changes date', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    fireEvent.input(screen.getByDisplayValue(book.dateRead), {target: { value: '2010-09-01'}})
    expect(screen.getByDisplayValue('2010-09-01')).toBeInTheDocument()
  })
  it('Should change available to borrow when can lend buttons are clicked', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    const lendYesBtn = screen.getByTestId('lend-yes-button')
    const lendNoBtn = screen.getByTestId('lend-no-button')
    expect(lendYesBtn).toHaveClass('selected')
    expect(lendNoBtn).toHaveClass('notSelected')
    userEvent.click(lendNoBtn)
    expect(lendYesBtn).toHaveClass('notSelected')
    expect(lendNoBtn).toHaveClass('selected')
  })
  it('Should change star read when can star read buttons are clicked', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    const starYesBtn = screen.getByTestId('star-yes-button')
    const starNoBtn = screen.getByTestId('star-no-button')
    expect(starYesBtn).toHaveClass('selected')
    expect(starNoBtn).toHaveClass('notSelected')
    userEvent.click(starNoBtn)
    expect(starYesBtn).toHaveClass('notSelected')
    expect(starNoBtn).toHaveClass('selected')
  })
  it('Should change genre when new genre option is chosen', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    const select = screen.getByRole('combobox')
    const newGenre = 'romance'
    expect(select).toHaveValue(book.genre)
    userEvent.selectOptions(select, newGenre)
    expect(select).toHaveValue(newGenre)
  })
  it('Should call both edit book and closeEdit functions when save button is clicked', async () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    userEvent.click(screen.getByText(/save/))
    expect(await editBook).toHaveBeenCalledTimes(1)
    expect(closeEdit).toHaveBeenCalledTimes(1)
  })
  it('Should call closeEdit function when cancel btn is clicked', () => {
    render(<EditBookModal book={book} closeEdit={closeEdit} editBook={editBook}/>)
    userEvent.click(screen.getByText(/cancel/))
    expect(closeEdit).toHaveBeenCalledTimes(1)
  })
})