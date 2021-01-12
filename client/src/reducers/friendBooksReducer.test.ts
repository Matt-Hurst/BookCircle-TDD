import friendBooksReducer from './friendBooksReducer'
import { SET_FRIEND_BOOKS } from '../actions/bookActions'
import { mockBooks } from '../mocks'

describe('friendBooksReducer', () => {
  it('Should return the initial state', () => {
    const newState = friendBooksReducer(undefined, {})
    expect(newState).toEqual([])
  })
  it('Should handle SET_FRIEND_BOOKS', () => {
    const setFriendBooksAction = {
      type: SET_FRIEND_BOOKS,
      payload: mockBooks
    }
    const newState = friendBooksReducer([], setFriendBooksAction)
    expect(newState).toEqual(setFriendBooksAction.payload)
  })
})