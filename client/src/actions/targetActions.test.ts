import  { setUserTarget, SET_TARGET } from './targetActions'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'

const mockStore = configureStore([thunk])

describe('Target Action Creators', () => {
  let store: any;
  let newTarget: number;
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('Should update target in store when user has no target set', async () => {
    newTarget = 4;
    store = mockStore({
      target: null,
    })
    const expectedAction = {
      type: SET_TARGET,
      payload: newTarget
    }
    
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newTarget
      })
    })
    await store.dispatch(setUserTarget(newTarget))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
  it('Should update target in store when user has target set', async () => {
    newTarget = 7;
    store = mockStore({
      target: 10,
    })
    const expectedAction = {
      type: SET_TARGET,
      payload: newTarget
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newTarget
      })
    })
    await store.dispatch(setUserTarget(newTarget))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
})