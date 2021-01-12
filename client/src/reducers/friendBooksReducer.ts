import { SET_FRIEND_BOOKS } from '../actions/bookActions'
import { Action, Book } from '../interfaces'

const friendBooksReducer = (state: Book[] = [], action: Action) => {
  switch(action.type) {
    case SET_FRIEND_BOOKS:
      return action.payload
    default:
      return state
  }
}

export default friendBooksReducer