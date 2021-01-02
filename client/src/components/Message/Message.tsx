import React from 'react'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { Message } from '../../interfaces'

import './Message.scss'

interface MessageComponentProps {
  message: Message;
  removeMessage: Function;
  confirmFriendRequest: Function;
  rejectFriendRequest : Function;  
  confirmBookRequest: Function; 
  rejectBookRequest: Function;
  userId?: string;
}

const MessageComponent: React.FC<MessageComponentProps> = (
  {
    message,
    removeMessage, 
    confirmBookRequest, 
    rejectBookRequest, 
    confirmFriendRequest, 
    rejectFriendRequest, 
    userId
  }
  ) =>  {

  return (
    <div data-testid='message-component' className='message-grand-wrapper'>
      <p>{message.message}</p>
      {message.type === 'resolved' && (
        <div className='message-grand-wrapper__request-btns-container'>
          <IoIosCloseCircle 
            data-testid='dismiss-icon'
            className='message-grand-wrapper__request-btns-container__resolved-btn' 
            onClick={() => removeMessage(userId, message.createdAt)}
          />
        </div>   
      )
      }
      {(message.type === 'friendRequest' || message.type === 'bookRequest') && (
        <div className='message-grand-wrapper__request-btns-container'>
          <IoIosCheckmarkCircle 
            data-testid='approve-icon' 
            className='message-grand-wrapper__request-btns-container__approve-btn'
            onClick={() => {
              if (message.type === 'friendRequest') {
                confirmFriendRequest(message.senderId, userId, message.createdAt)
              } else if (message.type === 'bookRequest') {
                confirmBookRequest(message.createdAt, userId, message.senderId, message.title)
              }
            }}  
          />
          <IoIosCloseCircle 
            data-testid='reject-icon'
            className='message-grand-wrapper__request-btns-container__reject-btn'
            onClick={() => {
              if (message.type === 'friendRequest') {
                rejectFriendRequest(message.senderId, userId, message.createdAt)
              } else if (message.type === 'bookRequest') {
                rejectBookRequest(message.createdAt, userId, message.senderId, message.book, message.title)
              }
            }}
            />
        </div>   
      )}
    </div>
  )
}

export default MessageComponent