import { messageActionTypes } from '../actions/messageActions'
import { Action, Message } from '../interfaces'

const messageReducer = (state: Message[] = [], action: Action) => {
  switch(action.type) {
    case messageActionTypes.REMOVE_MESSAGE:
      return action.payload
    default:
      return state
  }
}

export default messageReducer