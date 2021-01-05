import React from 'react'
import { screen, render, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';
import { mockBooks } from '../../mocks';

import Library from './Library'

const mockStore = configureStore([thunk])

describe('Library page', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      books: mockBooks,
      friendBooks: []
    })
  })

  it('Should render', () => {
    render(<Provider store={store}><Library /></Provider>)
    expect(screen.getByText(/Your Library/)).toBeInTheDocument()
    expect(screen.getByRole('combobox')).toBeInTheDocument()
    expect(screen.getByDisplayValue(/All Books/)).toBeInTheDocument()
  })

  it('Should render all users books', () => {
    render(<Provider store={store}><Library /></Provider>)
    expect(screen.getAllByTestId('container-book').length).toBe(mockBooks.length)
  })

  it('Should render only books that match selected option', () => {
    render(<Provider store={store}><Library /></Provider>)
    fireEvent.change(screen.getByRole('combobox'),{
      target: { value: 'science fiction'}
    })
    expect(screen.getAllByTestId('container-book').length).toBe(mockBooks.filter(book => book.genre === 'science fiction').length)
  })

  it('Should render userBookModal when book is clicked and friendBooks state is null', async () => {
    render(<Provider store={store}><Library /></Provider>)
    fireEvent.click(screen.getAllByRole('img')[0])
    expect(await screen.findByTestId('user-book-modal')).toBeInTheDocument()
  })
})