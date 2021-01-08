import { getFriendName } from './getFriendName'

import moxios from 'moxios'
import { mockFriends } from '../../mocks'

const mockResponse =
{
    "_id": "5fd484007c23911904515d4b",
    "name": "Dave"
}

describe('getFriendName function', () => {

  beforeEach(() => {
    moxios.install()
  })

  afterEach(() => {
    moxios.uninstall()
  })

  it('Should make axios request and return a friend name', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockResponse
      })
    })
    const result = await getFriendName(mockFriends[0])
    expect(result).toEqual(mockResponse)
  })
})