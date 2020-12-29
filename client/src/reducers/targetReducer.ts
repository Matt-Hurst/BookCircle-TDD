import { SET_TARGET } from '../actions/targetActions'
import { Action } from '../interfaces'

const targetReducer = (state:number = 0, action:Action) => {
  switch (action.type) {
    case SET_TARGET:
      return action.payload
    default:
      return state
  }
}

export default targetReducer;