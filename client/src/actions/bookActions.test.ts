import  { requestBook, SET_AVAILABLE_BOOKS } from './bookActions'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { bookId, friendId, mockBooks } from '../mocks';
import { Book } from '../interfaces';

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

  it('requestBook should make axios call and then disatch type: "REQUEST_BOOK" with payload', async () => {
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

})