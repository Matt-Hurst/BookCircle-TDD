import axios from 'axios'
import { retrieveTokenFromLocalStorage } from '../auth'
import { URL } from '../helpers'
import { Book } from '../interfaces';
import { SET_USER_BOOKS } from './userActions';

export const SET_AVAILABLE_BOOKS = 'SET_AVAILABLE_BOOKS';

export const getAvailableBooks = () => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `${URL}availableBooks`,
      headers: {'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}`}
    })
    dispatch({
      type: SET_AVAILABLE_BOOKS,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}

export const addBook = (book: Book) => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: `${URL}addBook`,
      data: { book },
      headers: {'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}`}
    })
    dispatch({
      type: SET_USER_BOOKS,
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
      url: `${URL}requestBook`,
      data: {
        bookId, 
        friendId
      },
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

export const editBook = (bookId: string, newBook: Book) => async (dispatch: Function) => {
  try {
    const { data } = await axios({
      method: 'put',
      url: `${URL}editBook`,
      data: {
        bookId, 
        newBook
      },
      headers: {'Authorization': `Bearer ${retrieveTokenFromLocalStorage()}`}
    })
    console.log(data)
    dispatch({
      type: SET_USER_BOOKS,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}