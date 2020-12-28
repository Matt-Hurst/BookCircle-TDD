import friendsReducer from './friendsReducer'
import { friendActionTypes } from '../actions/messageActions'
import { mockFriends } from '../mocks'

describe('friendsReducer', () => {
  it('Should return the initial state', () => {
    const newState = friendsReducer(undefined, {})
    expect(newState).toEqual({})
  })
  it('Should handle ADD_FRIEND', () => {
    const addFriendAction = {
      type: friendActionTypes.ADD_FRIEND,
      payload: mockFriends
    }
    const newState = friendsReducer({}, addFriendAction)
    expect(newState).toEqual(addFriendAction.payload)
  })
})