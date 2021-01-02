import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import  { 
  removeMessage,
  acceptFriendRequest,
  rejectFriendRequest, 
  acceptBookRequest,
  rejectBookRequest,
  requestBook,
  getAvailableBooks,
  getUserData
} from '../../actions'
import { BookShelf } from '../../components/BookShelf'
import { FriendBookModal } from '../../components/FriendBookModal'
import { MessageComponent } from '../../components/Message'
import { TargetDisplay } from '../../components/Target'
import { Book, Message } from '../../interfaces'

import './Dashboard.scss'

interface DashboardProps {
  availableBooks: Book[];
  messages: Message[];
  removeMessage: Function;
  acceptFriendRequest: Function;
  rejectFriendRequest: Function;
  acceptBookRequest: Function;
  rejectBookRequest: Function;
  requestBook: Function;
  getAvailableBooks: Function;
  getUserData: Function;
}

const Dashboard: React.FC<DashboardProps> = (
  {
    availableBooks, 
    messages, 
    removeMessage, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    acceptBookRequest, 
    rejectBookRequest, 
    requestBook,
    getAvailableBooks,
    getUserData
  }) => {

  const [friendsBookClicked, setFriendsBookClicked] = useState(false)
  const [clickedBook, setClickedBook] = useState<Book>()

  useEffect(() => {
    getAvailableBooks()
    getUserData()
  }, [])// eslint-disable-line
  const messagesContent = messages.length ? 
  (
    <div>
      {messages.map(message => {
        return (
          <MessageComponent
            key={message.createdAt}
            message={message}
            removeMessage={removeMessage}
            confirmFriendRequest={acceptFriendRequest}
            rejectFriendRequest={rejectFriendRequest}
            confirmBookRequest={acceptBookRequest}
            rejectBookRequest={rejectBookRequest}  
          />)
      })}
    </div>
  ) 
  : <p>No new messages</p>

  return (
    <div className='dashboard-grand-wrapper'>
      <h1>Recent activity:</h1>
      {messagesContent}
      <h1>Goal progress:</h1>
      <TargetDisplay />
      <h1>Friends books available to borrow:</h1>
      <BookShelf books={availableBooks} handleClick={(book: Book) => {
        setClickedBook(book)
        setFriendsBookClicked(true)
        }}
      />
      {friendsBookClicked && <FriendBookModal requestBook={requestBook} book={clickedBook} closeModal={() => setFriendsBookClicked(false)}/>}
    </div>
  )
}

const mapStateToProps = ({availableBooks, messages}:{availableBooks: Book[], messages: Message[]}) => {
  return {
    availableBooks,
    messages
  }
}

export default connect(
  mapStateToProps, 
  { 
    removeMessage, 
    acceptFriendRequest, 
    rejectFriendRequest, 
    acceptBookRequest, 
    rejectBookRequest,
    requestBook,
    getAvailableBooks,
    getUserData
  })(Dashboard)