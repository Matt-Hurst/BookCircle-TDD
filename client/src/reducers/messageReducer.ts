import { messageActionTypes } from '../actions/messageActions'
import { SET_MESSAGES } from '../actions/userActions'
import { Action, Message } from '../interfaces'

const messageReducer = (state: Message[] = [], action: Action) => {
  switch(action.type) {
    case messageActionTypes.REMOVE_MESSAGE:
      return action.payload
    case SET_MESSAGES: 
      return action.payload
    default:
      return state
  }
}

export default messageReducer