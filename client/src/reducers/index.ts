import { combineReducers } from "redux";

import target from './targetReducer'
import messages from './messageReducer'
import friends from './friendsReducer'
import availableBooks from './availableBookReducer'
import books from './bookReducer'

export default combineReducers({
  target,
  messages,
  friends,
  availableBooks,
  books
})