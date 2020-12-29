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
} from '../../actions'
import { BookShelf } from '../../components/BookShelf'
import { FriendBookModal } from '../../components/FriendBookModal'
import { MessageComponent } from '../../components/Message'
import { TargetDisplay } from '../../components/Target'
import { Book, Message } from '../../interfaces'

interface DashboardProps {
  availableBooks: Book[];
  messages: Message[];
  removeMessage: Function;
  acceptFriendRequest: Function;
  rejectFriendRequest: Function;
  acceptBookRequest: Function;
  rejectBookRequest: Function;
  requestBook: Function;
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
  }) => {

  const [friendsBookClicked, setFriendsBookClicked] = useState(false)
  const [clickedBook, setClickedBook] = useState<Book>()

  useEffect(() => {
    getAvailableBooks()
  }, [])

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
    <div>
      <h2>Recent activity:</h2>
      {messagesContent}
      <h2>Goal progress:</h2>
      <TargetDisplay />
      <h2>Friends books available to borrow:</h2>
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
  })(Dashboard)