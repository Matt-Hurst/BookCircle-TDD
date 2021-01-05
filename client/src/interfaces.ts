/* 
REDUX STORE:
  {
    friends: id[]
    friendBooks: Book[]
    availableBooks: Book[]
    messages: Message[]
    books: Book[]
    target: number
  }
*/

export interface Book {
  title: string;
  authors: string[];
  imageUrl: string;
  dateRead: string;
  review: string;
  availableToBorrow: boolean;
  genre: string;
  star: boolean;
  id?: string;
  friendName?: string;
  friendId?: string;
}

export interface Action {
  type?: string;
  payload?: any;
}

export interface Message {
  message: string;
  type: string;
  createdAt: string;
  senderId?: string;
  title?: string;
  book?: string;
}