/* 
REDUX STORE:
  {
    friends: id[]
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
  id: string;
  friendName?: string;
}

export interface Action {
  type?: string;
  payload?: any;
}

export interface Target {
  target?: number | null
}

export interface Message {
  message: string;
  type: string;
  createdAt: string;
  senderId?: string;
  title?: string;
  book?: string;
}