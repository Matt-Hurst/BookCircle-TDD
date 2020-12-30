import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';
import { mockBooks, mockMessages } from '../../mocks'
import Dashboard from './Dashboard'

const mockStore = configureStore([thunk])

describe('Dashboard page', () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({
      target: 10,
      messages: mockMessages,
      books: mockBooks,
      availableBooks: mockBooks
    })
  })
  it('Should render messages section', () => {
    render(<Provider store={store}><Dashboard /></Provider>)
    expect(screen.getByText('Recent activity:')).toBeInTheDocument()
  })
  it('Should render "No new messages" text when no messages', () => {
    const newStore = mockStore({
      target: 10,
      messages: [],
      books: mockBooks,
      availableBooks: mockBooks
    })
    render(<Provider store={newStore}><Dashboard /></Provider>)
    expect(screen.getByText('No new messages')).toBeInTheDocument()
  })
  it('Should render all messages', () => {
    render(<Provider store={store}><Dashboard /></Provider>)
    expect(screen.getAllByTestId('message-component').length).toBe(mockMessages.length)
  })
  it('Should render target component', () => {
    render(<Provider store={store}><Dashboard /></Provider>)
    expect(screen.getByText('Books read this year:')).toBeInTheDocument()
  })
})


