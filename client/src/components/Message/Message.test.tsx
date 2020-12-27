// TODO: REFACTOR SO THAT MESSAGE AND RENDER ARE FUNCTIONS THAT GET CALLED
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { mockMessages } from '../../mocks'
import MessageComponent from './Message'



describe('Message component', () => {
  const removeMessage = jest.fn()
  const confirmFriendRequest = jest.fn()
  const rejectFriendRequest = jest.fn()
  const confirmBookRequest = jest.fn()
  const rejectBookRequest = jest.fn()

  const createMessage = (type: string) => {
    const message = mockMessages[0]
    message.type = type
    return message
  }

  const renderComponent = (message: any) => {
    return  (
      render(
        <MessageComponent 
          message={message} 
          removeMessage={removeMessage} 
          confirmFriendRequest={confirmFriendRequest} 
          rejectFriendRequest={rejectFriendRequest} 
          confirmBookRequest={confirmBookRequest}
          rejectBookRequest={rejectBookRequest}
        />)
    )
  }  

  it('Should render the message content', () => {
      const message = createMessage("resolved")
      renderComponent(message)
      expect(screen.getByText('Dave accepted your request to borrow Dune, get in touch now to organise collection!')).toBeInTheDocument();
  })
  describe('Renders different buttons based on message type', () => {
    it('Should render dismiss button when message type is "resolved"', () => {
      const message = createMessage("resolved")
      renderComponent(message)
      expect(screen.getByTestId('dismiss-icon')).toBeInTheDocument()
    })
    it('Should not render approve and reject buttons when message type is "resolved"', () => {
      const message = createMessage("resolved")
      renderComponent(message)
      expect(screen.queryByTestId('approve-icon')).toBeNull()
      expect(screen.queryByTestId('reject-icon')).toBeNull()
    })
    it('Should render approve and reject buttons when message type is "friendRequest"', () => {
      const message = createMessage("friendRequest")
      renderComponent(message)
      expect(screen.queryByTestId('approve-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-icon')).toBeInTheDocument()
    })
    it('Should render approve and reject buttons when message type is "bookRequest"', () => {
      const message = createMessage("bookRequest")
      renderComponent(message)
      expect(screen.queryByTestId('approve-icon')).toBeInTheDocument()
      expect(screen.queryByTestId('reject-icon')).toBeInTheDocument()
    })
  })
  describe('Executes functions based on message type and button clicked', () => {
    it('Should execute removeMessage() when dismiss button is clicked', () => {
      const message = createMessage("resolved")
      renderComponent(message)
      fireEvent.click(screen.getByTestId('dismiss-icon'))
      expect(removeMessage).toHaveBeenCalledTimes(1)
    })
    it('Should execute confirmFriendRequest() when approve button is clicked and message.type is "friendRequest"', () => {
      const message = createMessage("friendRequest")
      renderComponent(message)
      fireEvent.click(screen.getByTestId('approve-icon'))
      expect(confirmFriendRequest).toHaveBeenCalledTimes(1)
    })
    it('Should execute rejectFriendRequest() when reject button is clicked and message.type is "friendRequest"', () => {
      const message = createMessage("friendRequest")
      renderComponent(message)
      fireEvent.click(screen.getByTestId('reject-icon'))
      expect(rejectFriendRequest).toHaveBeenCalledTimes(1)
    })
    it('Should execute confirmBookRequest() when approve button is clicked and message.type is "bookRequest"', () => {
      const message = createMessage("bookRequest")
      renderComponent(message)
      fireEvent.click(screen.getByTestId('approve-icon'))
      expect(confirmBookRequest).toHaveBeenCalledTimes(1)
    })
    it('Should execute rejectBookRequest() when reject button is clicked and message.type is "bookRequest"', () => {
      const message = createMessage("bookRequest")
      renderComponent(message)
      fireEvent.click(screen.getByTestId('reject-icon'))
      expect(rejectBookRequest).toHaveBeenCalledTimes(1)
    })
  })
})