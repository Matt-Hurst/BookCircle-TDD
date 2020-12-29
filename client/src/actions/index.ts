const { setUserTarget, getTarget } = require('./targetActions')
const { removeMessage, acceptFriendRequest, rejectFriendRequest, acceptBookRequest, rejectBookRequest } = require('./messageActions')
const { requestBook, getAvailableBooks } = require('./bookActions')

export {
  getTarget,
  setUserTarget,
  removeMessage,
  acceptFriendRequest,
  rejectFriendRequest,
  acceptBookRequest,
  rejectBookRequest,
  requestBook,
  getAvailableBooks
}