import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Target from './Target';

const mockStore = configureStore([])

describe('Target', () => {
  describe('no target in state set', () => {
    let store: any;
    beforeEach(() => {
      store = mockStore({
        target: null,
        books: []
      })
    })
    it('Should render set goal prompt if no goal is set', () => {
      render(<Provider store={store}><Target /></Provider>)
      expect(screen.getByText('no goals set, why not set one?')).toBeInTheDocument()
    })
    it('Should show SetTargetModal if add goal button is clicked', () => {
      render(<Provider store={store}><Target /></Provider>)
      fireEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    })
  })
  describe('if target state then target progress shown', () => {
    let store: any;
    beforeEach(() => {
      store = mockStore({
        target: 8,
        books: [{
          title: "Death's End",
          authors: ['Cixin Liu'],
          imageUrl: 'http://books.google.com/books/content?id=A_1oCAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
          dateRead: '2020-08-03',
          review: 'Awesome must read',
          availableToBorrow: true,
          genre: 'science fiction',
          star: true,
          id: 'c20f966f-df6f-4e16-9d85-64860ac36a73',
        },
        {
          title: "Foundation and Earth",
          authors: ['Isaac Asimov'],
          imageUrl: 'http://books.google.com/books/content?id=QoI6QptJvrYC&printsec=frontcover&img=1&zoom=1&source=gbs_api',
          dateRead: '2020-01-12',
          review: 'Interesting series',
          availableToBorrow: true,
          genre: 'science fiction',
          star: false,
          id: 'ffd9e79a-176c-4b28-a4db-91976886f748',
        },]
      })
    })
    it('Should render correctly', () => {
      render(<Provider store={store}><Target /></Provider>)
      expect(screen.getByText('edit')).toBeInTheDocument();
    })
    it('Should render ProgressBar component', () => {
      render(<Provider store={store}><Target /></Provider>)
      expect(screen.getByText('25%')).toBeInTheDocument()
    })
    it('Should show SetTargetModal if edit button is clicked', () => {
      render(<Provider store={store}><Target /></Provider>)
      fireEvent.click(screen.getByRole('button'))
      expect(screen.getByRole('spinbutton')).toBeInTheDocument();
    })
  })
})
