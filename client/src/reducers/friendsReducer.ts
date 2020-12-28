import { friendActionTypes } from '../actions/messageActions'
import { Action } from '../interfaces'

const friendsReducer = (state = {}, action: Action) => {
  switch(action.type) {
    case friendActionTypes.ADD_FRIEND:
      return action.payload
    default:
      return state
  }
}

export default friendsReducer