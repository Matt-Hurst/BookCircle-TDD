import { bookReducer } from './bookReducer'
import { SET_AVAILABLE_BOOKS } from '../actions/bookActions'
import { mockBooks } from '../mocks'

describe('bookReducer', () => {
  it('Should return the initial state', () => {
    const newState = bookReducer(undefined, {})
    expect(newState).toEqual({})
  })
  it('Should handle SET_AVAILABLE_BOOKS', () => {
    const setAvailableBooksAction = {
      type: SET_AVAILABLE_BOOKS,
      payload: mockBooks
    }
    const newState = bookReducer({}, setAvailableBooksAction)
    expect(newState).toEqual(setAvailableBooksAction.payload)
  })
})