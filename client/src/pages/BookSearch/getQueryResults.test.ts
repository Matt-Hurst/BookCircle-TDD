import { getQueryResults } from './getQueryResults'
import moxios from 'moxios'
import { mockedSearchedBooks, mockedResults } from '../../mocks'


describe('getQueryResults in BookSearch Folder', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  
  it('Should make axios request and then return array of searchedBooks', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: mockedSearchedBooks
      })
    })
    const result = await getQueryResults('Death', 'Author')
    expect(result).toEqual(mockedResults)
  })

})