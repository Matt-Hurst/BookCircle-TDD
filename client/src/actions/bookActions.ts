import axios from 'axios'
export const SET_AVAILABLE_BOOKS = 'SET_AVAILABLE_BOOKS';
const URL = 'http://localhost:3001/'

export const requestBook = (friendId: string, bookId: string) => async (dispatch: Function) => {
  try {
    const { status } = await axios.post(`${URL}requestBook`, {
      friendId,
      bookId
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