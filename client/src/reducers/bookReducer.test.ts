import bookReducer from './bookReducer'
import { mockBooks } from '../mocks'
import { SET_USER_BOOKS } from '../actions/userActions'

describe('availableBookReducer', () => {
  it('Should return the initial state', () => {
    const newState = bookReducer(undefined, {})
    expect(newState).toEqual([])
  })
  it('Should handle SET_USER_BOOKS', () => {
    const setAvailableBooksAction = {
      type: SET_USER_BOOKS,
      payload: mockBooks
    }
    const newState = bookReducer([], setAvailableBooksAction)
    expect(newState).toEqual(setAvailableBooksAction.payload)
  })
})