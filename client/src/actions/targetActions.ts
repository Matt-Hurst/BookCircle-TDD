import axios from 'axios'
export const SET_TARGET = 'SET_TARGET';
const URL = 'http://localhost:3001/'

export const getTarget = () => async (dispatch: Function) => {
  try {
    const { data } = await axios.get(`${URL}target`)
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
    const { data } = await axios.put(`${URL}updateTarget`, {
      target: newTarget
    })
    dispatch({
      type: SET_TARGET,
      payload: data
    })
  } catch (error) {
    console.error(error)
  }
}