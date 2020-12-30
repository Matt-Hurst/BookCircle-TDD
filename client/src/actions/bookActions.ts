import axios from 'axios'
import { retrieveTokenFromLocalStorage } from '../helpers'
import { URL } from '../helpers'

export const SET_AVAILABLE_BOOKS = 'SET_AVAILABLE_BOOKS';

export const getAvailableBooks = () => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${URL}availableBooks`,
      headers: {'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}`}
    })
    console.log('DISPATCH: ',dispatch)
    dispatch({
      type: SET_AVAILABLE_BOOKS,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}

export const requestBook = (friendId: string, bookId: string) => async (dispatch: Function) => {
  try {
    const { status } = await axios({
      method: 'post',
      url: `${URL}availableBooks`,
      headers: {'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}`}
    })
    if(status === 200) {
      const { data } = await axios.get(`${URL}availableBooks`)
      dispatch({
        type: SET_AVAILABLE_BOOKS,
        payload: data
      })
    }
  } catch (error) {
    console.error(error)
  }
}