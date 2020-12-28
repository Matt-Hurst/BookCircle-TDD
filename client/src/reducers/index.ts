import { combineReducers } from "redux";

import { target } from './targetReducer'
import { messages } from './messageReducer'
import { friends } from './friendsReducer'
import { bookReducer } from './bookReducer'

export default combineReducers({
  target,
  messages,
  friends,
  bookReducer
})