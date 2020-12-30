import availableBookReducer from './availableBookReducer'
import { SET_AVAILABLE_BOOKS } from '../actions/bookActions'
import { mockBooks } from '../mocks'

describe('availableBookReducer', () => {
  it('Should return the initial state', () => {
    const newState = availableBookReducer(undefined, {})
    expect(newState).toEqual([])
  })
  it('Should handle SET_AVAILABLE_BOOKS', () => {
    const setAvailableBooksAction = {
      type: SET_AVAILABLE_BOOKS,
      payload: mockBooks
    }
    const newState = availableBookReducer([], setAvailableBooksAction)
    expect(newState).toEqual(setAvailableBooksAction.payload)
  })
})