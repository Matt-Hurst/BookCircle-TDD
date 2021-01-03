import axios from 'axios'
import { retrieveTokenFromLocalStorage } from '../auth'
import { URL } from '../helpers'


export const friendActionTypes = {
 ADD_FRIEND: 'ADD_FRIEND'
}

export const messageActionTypes = {
  REMOVE_MESSAGE: 'REMOVE_MESSAGE',
}

export const removeMessage  = (userId: string, createdAt: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'delete',
      url: `${URL}removeActivityLogElement`,
      data: {
        userId,
        createdAt
      },
      headers: {
        'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}`
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

export const acceptFriendRequest = (senderId: string, createdAt: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${URL}confirmFriend`,
      data: {
        senderId,
        createdAt
      },
      headers: { 'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}` }
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

export const rejectFriendRequest = (senderId: string, createdAt: string) => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'delete',
      url: `${URL}rejectFriendRequest`,
      data: {
        senderId,
        createdAt
      },
      headers: { 'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}` }
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
    const { data } = await axios({
      method: 'post',
      url: `${URL}rejectFriendRequest`,
      headers: { 'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}` },
      data: {
        senderId,
        userId,
        createdAt,
        title
      },
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
      method: 'post',
      url: `${URL}rejectFriendRequest`,
      headers: { 'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}` },
      data: {
        senderId,
        userId,
        createdAt,
        title,
        book: bookId
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
