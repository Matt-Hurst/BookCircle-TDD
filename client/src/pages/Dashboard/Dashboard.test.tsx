import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockBooks, mockMessages } from '../../mocks'
import Dashboard from './Dashboard'

const mockStore = configureStore([])

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
    store = mockStore({
      target: 10,
      messages: []
    })
    render(<Provider store={store}><Dashboard /></Provider>)
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
  it('Should render all available books', () => {
    render(<Provider store={store}><Dashboard /></Provider>)
    expect(screen.getAllByTestId('container-book').length).toBe(mockBooks.length)
  })
})


