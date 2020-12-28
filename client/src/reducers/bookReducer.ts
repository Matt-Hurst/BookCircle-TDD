import { SET_AVAILABLE_BOOKS } from '../actions/bookActions'
import { Action } from '../interfaces'

export const bookReducer = (state = {}, action: Action) => {
  switch(action.type) {
    case SET_AVAILABLE_BOOKS:
      return action.payload
    default:
      return state
  }
}