import friendsReducer from './friendsReducer'
import { friendActionTypes } from '../actions/messageActions'
import { mockFriends } from '../mocks'
import { SET_FRIENDS } from '../actions/userActions'

describe('friendsReducer', () => {
  it('Should return the initial state', () => {
    const newState = friendsReducer(undefined, {})
    expect(newState).toEqual([])
  })
  it('Should handle ADD_FRIEND', () => {
    const addFriendAction = {
      type: friendActionTypes.ADD_FRIEND,
      payload: mockFriends
    }
    const newState = friendsReducer([], addFriendAction)
    expect(newState).toEqual(addFriendAction.payload)
  })
  it('Should handle SET_FRIENDS', () => {
    const setFriendsAction = {
      type: SET_FRIENDS,
      payload: mockFriends
    }
    const newState = friendsReducer([], setFriendsAction)
    expect(newState).toEqual(setFriendsAction.payload)
  })
})