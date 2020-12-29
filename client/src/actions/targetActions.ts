import axios from 'axios'
import { retrieveTokenFromLocalStorage } from '../helpers'
export const SET_TARGET = 'SET_TARGET';
const URL = 'http://localhost:3001/'

export const getTarget = () => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${URL}rejectFriendRequest`,
      headers: { 'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}` },
    })
    dispatch({
      type: SET_TARGET,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}

export const setUserTarget = (newTarget: number) => async (dispatch: Function) => {
  try {
    const { data } = await axios( {
      method: 'put',
      url: `${URL}updateTarget`,
      headers: { 'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}` },
      data: {
        target: newTarget
      }
    })
    dispatch({
      type: SET_TARGET,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}