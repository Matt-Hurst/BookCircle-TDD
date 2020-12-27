import React from 'react'
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import { Message } from '../../interfaces'

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
    <div>
      <p>{message.message}</p>
      {message.type === 'resolved' && (
        <div>
          <IoIosCloseCircle 
            data-testid='dismiss-icon' 
            onClick={() => removeMessage(userId, message.createdAt)}
          />
        </div>   
      )
      }
      {(message.type === 'friendRequest' || message.type === 'bookRequest') && (
        <div>
          <IoIosCheckmarkCircle 
            data-testid='approve-icon' 
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