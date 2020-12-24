import axios from 'axios'
export const SET_TARGET = 'SET_TARGET';
const URL = 'http://localhost:3001/'

export const setUserTarget = (newTarget: number) => async (dispatch: Function) => {
  try {
    const { data } = await axios.put(`${URL}updateTarget`, {
      target: 4
    })
    dispatch({
      type: SET_TARGET,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}