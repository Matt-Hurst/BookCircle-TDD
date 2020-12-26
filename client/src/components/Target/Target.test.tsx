import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Target from './Target';
import { mockBooks } from '../../mocks';

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
        books: mockBooks
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
