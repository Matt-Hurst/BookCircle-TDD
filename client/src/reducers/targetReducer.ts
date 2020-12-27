import { SET_TARGET } from '../actions/targetActions'
import { Action, Target } from '../interfaces'

const targetReducer = (state:Target = {}, action:Action) => {
  switch (action.type) {
    case SET_TARGET:
      return action.payload
    default:
      return state
  }
}

export default targetReducer;