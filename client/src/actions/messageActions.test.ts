import  { 
  removeMessage,
  acceptFriendRequest,
  rejectFriendRequest, 
  acceptBookRequest,
  rejectBookRequest,
  messageActionTypes 
} from './messageActions'
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import moxios from 'moxios'
import { mockFriends, mockMessages } from '../mocks';
import { title } from 'process';

const mockStore = configureStore([thunk])

describe('Message Action Creators', () => {
  let store: any;
  let newMessages = mockMessages.slice(1)
  const userId = '4dasdiawuhe12dash';
  const senderId = 'klajdsjk1212d';
  const bookId = 'jhashdjasy1'

  const createAction = (action: string) => {
    return {
      type: action,
      payload: newMessages
    }
  }

  beforeEach(() => {
    store = mockStore({
      messages: [mockMessages]
    })
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })

  it('removeMessage should make axios call and then disatch type: "REMOVE_MESSAGE" with payload', async () => {
    const expectedAction = createAction(messageActionTypes.REMOVE_MESSAGE)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newMessages
      })
    })
    await store.dispatch(removeMessage(userId, mockMessages[0].createdAt))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
  it('acceptFriendRequest should make axios call and then disatch type: "REMOVE_MESSAGE" with payload', async () => {
    const expectedAction = createAction(messageActionTypes.REMOVE_MESSAGE)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {activityLog: newMessages, friends: mockFriends}
      })
    })
    await store.dispatch(acceptFriendRequest(senderId, userId, mockMessages[0].createdAt))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
    expect(actionsCalled[1].payload).toEqual(mockFriends)
  })
  it('rejectFriendRequest should make axios call and then disatch type: "REMOVE_MESSAGE" with payload', async () => {
    const expectedAction = createAction(messageActionTypes.REMOVE_MESSAGE)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newMessages
      })
    })
    await store.dispatch(rejectFriendRequest(senderId, userId, mockMessages[0].createdAt))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
  it('acceptBookRequest should make axios call and then disatch type: "REMOVE_MESSAGE" with payload', async () => {
    const expectedAction = createAction(messageActionTypes.REMOVE_MESSAGE)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newMessages
      })
    })
    await store.dispatch(acceptBookRequest(senderId, userId, mockMessages[0].createdAt, title))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
  it('rejectBookRequest should make axios call and then disatch type: "REMOVE_MESSAGE" with payload', async () => {
    const expectedAction = createAction(messageActionTypes.REMOVE_MESSAGE)

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: newMessages
      })
    })
    await store.dispatch(rejectBookRequest(senderId, userId, mockMessages[0].createdAt, title, bookId))
    const actionsCalled = store.getActions();
    expect(actionsCalled[0]).toEqual(expectedAction)
  })
})