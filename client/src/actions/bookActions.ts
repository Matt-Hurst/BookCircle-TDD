import axios from 'axios'
export const REQUEST_BOOK = 'REQUEST_BOOK';
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
        type: REQUEST_BOOK,
        payload: data
      })
    }
  } catch (error) {
    console.error(error)
  }
}