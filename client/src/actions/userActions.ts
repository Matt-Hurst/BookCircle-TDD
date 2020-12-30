import axios from 'axios'
import { retrieveTokenFromLocalStorage, URL } from '../helpers'
import { SET_TARGET } from './targetActions';

export const SET_USER_BOOKS = 'SET_USER_BOOKS';
export const SET_FRIENDS = 'SET_FRIENDS';
export const SET_MESSAGES = 'SET_MESSAGES'

export const getUserData = () => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${URL}getCurrentUser`,
      headers: { 'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}` }
    })
    dispatch({
      type: SET_USER_BOOKS,
      payload: data.books
    })
    dispatch({
      type: SET_TARGET,
      payload: data.yearlyTarget
    })
    dispatch({
      type: SET_FRIENDS,
      payload: data.friends
    })
    dispatch({
      type: SET_MESSAGES,
      payload: data.activityLog
    })
  } catch (error) {
    console.error(error)
  }
}