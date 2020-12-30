import  { getUserData, SET_USER_BOOKS, SET_FRIENDS, SET_MESSAGES } from './userActions'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { mockMessages, mockFriends, mockBooks } from '../mocks';
import { SET_TARGET } from './targetActions';

const mockStore = configureStore([thunk])

describe('User Action Creators', () => {
  const store = mockStore({
    target: 0,
    books: [],
    availableBooks: [],
    friends: [],
    messages: []
  })

  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  it('Should make axios call and make 4 dispatches to set redux store', async () => {

    const expectedData = {
      yearlyTarget: 10,
      books: mockBooks,
      friends: mockFriends,
      activityLog: mockMessages
    }

    const expectedAction1 = {
      type: SET_USER_BOOKS,
      payload: mockBooks
    }
    const expectedAction2 = {
      type: SET_TARGET,
      payload: 10
    }   
    const expectedAction3 = {
      type: SET_FRIENDS,
      payload: mockFriends
    }
    const expectedAction4 = {
      type: SET_MESSAGES,
      payload: mockMessages
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: expectedData
      })
    })

    await store.dispatch(getUserData())
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction1)
    expect(actionsCalled[1]).toEqual(expectedAction2)
    expect(actionsCalled[2]).toEqual(expectedAction3)
    expect(actionsCalled[3]).toEqual(expectedAction4)
  })
})