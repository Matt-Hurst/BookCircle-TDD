import  { requestBook, getAvailableBooks, addBook, SET_AVAILABLE_BOOKS } from './bookActions'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { bookId, friendId, mockBooks } from '../mocks';
import { Book } from '../interfaces';
import { SET_USER_BOOKS } from './userActions';

const mockStore = configureStore([thunk])

describe('Book Action Creators', () => {
  let store: any;
  let newAvailableBooks: Book[];

  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('requestBook should make axios call and then disatch type: "SET_AVAILABLE_BOOKS" with payload', async () => {
    newAvailableBooks = mockBooks.slice(1);
    store = mockStore({
      availableBooks: mockBooks,
    })
    const expectedAction = {
      type: SET_AVAILABLE_BOOKS,
      payload: newAvailableBooks
    }
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
      })
    })
    moxios.wait(() => {
    const request = moxios.requests.mostRecent();
    request.respondWith({
      status: 200,
      response: newAvailableBooks
    })
    })
    await store.dispatch(requestBook(friendId, bookId))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
  
  it('getAvailableBooks should make axios call and then disatch type: "SET_AVAILABLE_BOOKS" with payload', async () => {
    newAvailableBooks = mockBooks;
    store = mockStore({
      availableBooks: [],
    })
    const expectedAction = {
      type: SET_AVAILABLE_BOOKS,
      payload: newAvailableBooks
    }
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newAvailableBooks
      })
    })
    await store.dispatch(getAvailableBooks())
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })

  it('addBook should make axios call and then disatch type: "SET_USER_BOOKS" with payload', async () => {
    newAvailableBooks = mockBooks;
    store = mockStore({
      availableBooks: mockBooks,
    })
    const expectedAction = {
      type: SET_USER_BOOKS,
      payload: newAvailableBooks
    }
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newAvailableBooks
      })
    })
    await store.dispatch(addBook(mockBooks[0]))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
})