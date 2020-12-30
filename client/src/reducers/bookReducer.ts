import { SET_USER_BOOKS } from '../actions/userActions'
import { Action, Book } from '../interfaces'


const bookReducer = (state: Book[] = [], action: Action) => {
  switch(action.type) {
    case SET_USER_BOOKS:
      return action.payload
    default:
      return state
  }
}

export default bookReducer