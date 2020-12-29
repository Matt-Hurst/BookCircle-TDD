import { messageActionTypes } from '../actions/messageActions'
import { Action } from '../interfaces'

const messageReducer = (state = [], action: Action) => {
  switch(action.type) {
    case messageActionTypes.REMOVE_MESSAGE:
      return action.payload
    default:
      return state
  }
}

export default messageReducer