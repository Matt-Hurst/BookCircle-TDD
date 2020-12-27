import axios from 'axios'
const URL = 'http://localhost:3001/'

export const messageActionTypes = {
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
  ACCEPT_BOOK_REQUEST: 'ACCEPT_BOOK_REQUEST',
  REJECT_BOOK_REQUEST: 'REJECT_BOOK_REQUEST',
  ACCEPT_FRIEND_REQUEST: 'ACCEPT_FRIEND_REQUEST',
  REJECT_FRIEND_REQUEST: 'REJECT_FRIEND_REQUEST',
}

export const removeMessage  = (userId: string, createdAt: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios.delete(`${URL}removeActivityLogElement`, {
      data: {
        userId,
        createdAt
      }
    })
    dispatch({
      type: messageActionTypes.REMOVE_MESSAGE,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}

export const acceptFriendRequest = (senderId: string, userId: string, createdAt: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios.post(`${URL}confirmFriend`, {
      senderId,
      userId,
      createdAt
    })
    dispatch({
      type: messageActionTypes.ACCEPT_FRIEND_REQUEST,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}

export const rejectFriendRequest = (senderId: string, userId: string, createdAt: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios.delete(`${URL}rejectFriendRequest`, {
      data: {
        senderId,
        userId,
        createdAt
      }
    })
    dispatch({
      type: messageActionTypes.REJECT_FRIEND_REQUEST,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}

export const acceptBookRequest = (senderId: string, userId: string, createdAt: string, title: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios.post(`${URL}acceptBookRequest`, {
      senderId,
      userId,
      createdAt,
      title
    })
    dispatch({
      type: messageActionTypes.ACCEPT_BOOK_REQUEST,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}

export const rejectBookRequest = (senderId: string, userId: string, createdAt: string, title: string, bookId: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios.post(`${URL}acceptBookRequest`, {
      senderId,
      userId,
      createdAt,
      title,
      book: bookId
    })
    dispatch({
      type: messageActionTypes.REJECT_BOOK_REQUEST,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}
