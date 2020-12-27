import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { mockMessages } from '../../mocks'
import Dashboard from './Dashboard'

const mockStore = configureStore([])

describe('Dashboard page', () => {
  let store: any;
  beforeEach(() => {
    store = mockStore({
      target: 10,
      books: mockMessages
    })
  })
  it('Should render messages section', () => {
    render(<Provider store={store}><Dashboard /></Provider>)
    expect(screen.getByText('Recent activity:')).toBeInTheDocument()
  })
  it('Should render "no messages" message when no messages', () => {
    store = mockStore({
      target: 10,
      books: []
    })
    render(<Provider store={store}><Dashboard /></Provider>)
    expect(screen.getByText('No new messages')).toBeInTheDocument()
  })
  it('Should render all messages', () => {
    render(<Provider store={store}><Dashboard /></Provider>)
    expect(screen.getAllByRole('Message').length).toBe(mockMessages.length)
  })
  it('Should render target component', () => {

  })
  it('Should render all available books', () => {

  })
})


