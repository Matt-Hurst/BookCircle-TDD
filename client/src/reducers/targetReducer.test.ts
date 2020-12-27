import targetReducer from './targetReducer'
import { SET_TARGET } from '../actions/targetActions'

describe('targetReducer', () => {
  it('Should return the initial state', () => {
    const newState = targetReducer(undefined, {})
    expect(newState).toEqual({})
  })
  it('Should handle SET_TARGET', () => {
    const updateTargetAction = {
      type: SET_TARGET,
      payload: 6
    }
    const newState = targetReducer({}, updateTargetAction)
    expect(newState).toEqual(updateTargetAction.payload)
  })
})