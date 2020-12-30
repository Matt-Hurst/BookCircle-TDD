import { getQueryResults } from './getQueryResults'
import moxios from 'moxios'
import { mockBooks } from '../../mocks'


describe('getQueryResults in BookSearch Folder', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  
  it('Should make axios request and then return array of books', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockBooks
      })
    })
    const result = await getQueryResults('Death', 'Author')
    expect(result).toEqual(mockBooks)
  })

})