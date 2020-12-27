import axios from 'axios'
const URL = 'http://localhost:3001/'

export const friendActionTypes = {
 ADD_FRIEND: 'ADD_FRIEND'
}

export const messageActionTypes = {
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
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
      type: messageActionTypes.REMOVE_MESSAGE,
      payload: data.activityLog
    })
    dispatch({
      type: friendActionTypes.ADD_FRIEND,
      payload: data.friends
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
      type: messageActionTypes.REMOVE_MESSAGE,
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
      type: messageActionTypes.REMOVE_MESSAGE,
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
      type: messageActionTypes.REMOVE_MESSAGE,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}
