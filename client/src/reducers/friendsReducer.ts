import { act } from 'react-dom/test-utils'
import { friendActionTypes } from '../actions/messageActions'
import { SET_FRIENDS } from '../actions/userActions'
import { Action } from '../interfaces'

const friendsReducer = (state: string[] = [], action: Action) => {
  switch(action.type) {
    case friendActionTypes.ADD_FRIEND:
      return action.payload
    case SET_FRIENDS:
      return action.payload
    default:
      return state
  }
}

export default friendsReducer