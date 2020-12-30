import messageReducer from './messageReducer'
import { messageActionTypes } from '../actions/messageActions'
import { mockMessages } from '../mocks'
import { SET_MESSAGES } from '../actions/userActions'

describe('messageReducer', () => {
  it('Should return the initial state', () => {
    const newState = messageReducer(undefined, {})
    expect(newState).toEqual([])
  })
  it('Should handle REMOVE_MESSAGE', () => {
    const removeMessageAction = {
      type: messageActionTypes.REMOVE_MESSAGE,
      payload: mockMessages
    }
    const newState = messageReducer([], removeMessageAction)
    expect(newState).toEqual(removeMessageAction.payload)
  })
  it('Should handle SET_MESSAGES', () => {
    const setMessageAction = {
      type: SET_MESSAGES,
      payload: mockMessages
    }
    const newState = messageReducer([], setMessageAction)
    expect(newState).toEqual(setMessageAction.payload)
  })
})