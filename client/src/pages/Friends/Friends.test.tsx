import React from 'react'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import configureStore from 'redux-mock-store';
import Friends from './Friends'
import { getFriendName } from './getFriendName'
import { mockFriends } from '../../mocks'

import {
  BrowserRouter as Router,
} from "react-router-dom"

const mockStore = configureStore([thunk])

const mockResponse1 = {name: 'Andre', _id: mockFriends[0]}
const mockResponse2 = {name: 'Matt', _id: mockFriends[0]}
const mockResponse3 = {name: 'Johnny', _id: mockFriends[0]}

jest.mock('./getFriendName')

describe('Friends Page', () => {

  let store: any;

  beforeEach(() => {
    (getFriendName as jest.Mock)
    .mockImplementationOnce(() => mockResponse1)
    .mockImplementationOnce(() => mockResponse2)
    .mockImplementationOnce(() => mockResponse3)
    store = mockStore({
      friends: mockFriends
    })
  })

  it('Should render', () => {
    render(<Provider store={store}><Router><Friends /></Router></Provider>)
    expect(screen.getByTestId('friends-component')).toBeInTheDocument()
  })

  it('Should render a heading', () => {
    render(<Provider store={store}><Router><Friends /></Router></Provider>)
    expect(screen.getByText(/Friends/)).toBeInTheDocument()
  })

  it('Should render a list of friends', async () => {
    render(<Provider store={store}><Router><Friends /></Router></Provider>)
    expect(await screen.findByText(/Andre/)).toBeInTheDocument()
  })

  it('Should render a button for each friend that when clicked directs to friends library page', async () => {
    render(<Provider store={store}><Router><Friends /></Router></Provider>)
    const buttons = await screen.findAllByRole('button')
    expect(buttons.length).toBe(3)
  })
})