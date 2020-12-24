import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react';

import SetTargetModal from './SetTargetModal'

describe('SetTargetModal', () => {

  const changeTarget = jest.fn();
  const turnModalOff = jest.fn()

  it('should render correctly', () => {
    render(<SetTargetModal changeTarget={changeTarget} turnModalOff={turnModalOff} />)
    expect(screen.getByText('submit')).toBeInTheDocument();
  })
  it('should close if X button is clicked', () => {
    render(<SetTargetModal changeTarget={changeTarget} turnModalOff={turnModalOff} />)
    fireEvent.click(screen.getByTestId('closeSVG'))
    expect(turnModalOff).toHaveBeenCalledTimes(1)
  })
  it('should close if greyedBackgroundDiv is clicked', () => {
    render(<SetTargetModal changeTarget={changeTarget} turnModalOff={turnModalOff} />)
    fireEvent.click(screen.getByTestId('greyedBackgroundDiv'))
    expect(turnModalOff).toHaveBeenCalledTimes(1)
  })
  it('if input is null, on submit button click should close modal and not change target', () => {
    render(<SetTargetModal changeTarget={changeTarget} turnModalOff={turnModalOff} />)
    fireEvent.click(screen.getByText('submit'))
    expect(changeTarget).toHaveBeenCalledTimes(0)
    expect(turnModalOff).toHaveBeenCalledTimes(1)
  })
  it('Should call changeTarget with correct input', async () => {
    render(<SetTargetModal changeTarget={changeTarget} turnModalOff={turnModalOff} />)
    await fireEvent.change(screen.getByRole('spinbutton'), { target: { value: '4' }, });
    fireEvent.click(screen.getByText('submit'))
    expect(changeTarget).toHaveBeenCalledWith(4)
  })
})