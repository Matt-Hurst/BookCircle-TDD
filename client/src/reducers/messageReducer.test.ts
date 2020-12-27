import messageReducer from './messageReducer'
import { messageActionTypes } from '../actions/messageActions'
import { mockMessages } from '../mocks'

describe('messageReducer', () => {
  it('Should return the initial state', () => {
    const newState = messageReducer(undefined, {})
    expect(newState).toEqual({})
  })
  it('Should handle REMOVE_MESSAGE', () => {
    const removeMessageAction = {
      type: messageActionTypes.REMOVE_MESSAGE,
      payload: mockMessages
    }
    const newState = messageReducer({}, removeMessageAction)
    expect(newState).toEqual(removeMessageAction.payload)
  })
})