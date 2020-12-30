import React from 'react'
import { render, screen, fireEvent, act } from '@testing-library/react'
import BookSearch from './BookSearch'
import { getQueryResults } from './getQueryResults'

jest.mock('./getQueryResults')

describe('BookSearch page', () => {

  beforeEach(() => {
    (getQueryResults as jest.Mock)
      .mockImplementationOnce(() => "Death's End")
      .mockImplementationOnce(() => "Foundation and Earth")
  })
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Should render', () => {
    render(<BookSearch />)
    expect(screen.getByTestId('book-search-page')).toBeInTheDocument()
  })
  it('Should change searchBy component state from "title" to "author" when "author button clicked", and vice versa', () => {
    render(<BookSearch />)
    const authorBtn = screen.getByTestId('search-by-author-button')
    const titelBtn = screen.getByTestId('search-by-title-button')
    expect(screen.getByPlaceholderText('title')).toBeInTheDocument()
    authorBtn.click()
    expect(screen.getByPlaceholderText('author')).toBeInTheDocument()
    titelBtn.click()
    expect(screen.getByPlaceholderText('title')).toBeInTheDocument()
  })
  it('Should render results of successful search', async () => {
    render(<BookSearch />)
    const searchBar = screen.getByTestId('search-input')
    const searchButton = screen.getByTestId('search-button')
    expect(screen.queryByText("Death's End")).toBeNull()
    act(() => {
      fireEvent.change(searchBar, {
      target: { value: 'Death'}
    })})
    expect(screen.getByDisplayValue('Death')).toBeInTheDocument()
    act(() => {
      searchButton.click()
    })
    expect(await screen.findByText("Death's End")).toBeInTheDocument()
  })
  it('Should update results after successful search', async () => {
    render(<BookSearch />)
    const searchBar = screen.getByTestId('search-input')
    const searchButton = screen.getByTestId('search-button')
    expect(screen.queryByText("Death's End")).toBeNull()
    act(() => {
      fireEvent.change(searchBar, {
      target: { value: 'Death'}
    })})
    expect(screen.getByDisplayValue('Death')).toBeInTheDocument()
    act(() => {
      searchButton.click()
    })
    expect(await screen.findByText("Death's End")).toBeInTheDocument()
    act(() => {
      fireEvent.change(searchBar, {
      target: { value: 'Foundation'}
    })})
    expect(screen.getByDisplayValue('Foundation')).toBeInTheDocument()
    act(() => {
      searchButton.click()
    })
    expect(await screen.findByText("Foundation and Earth")).toBeInTheDocument()
    expect(screen.queryByText("Death's End")).toBeNull()
  })
})

