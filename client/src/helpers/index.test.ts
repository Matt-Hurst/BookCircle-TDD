import { calculateBooksReadThisYear } from './'
import { mockBooks } from '../mocks'

it('should return count of books read this year', () => {
  const result = calculateBooksReadThisYear(mockBooks)
  expect(result).toBe(2)
})