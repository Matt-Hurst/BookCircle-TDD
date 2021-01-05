const currentYear = new Date().getFullYear()

export const mockBooks = 
  [
    {
    title: "Death's End",
    authors: ['Cixin Liu'],
    imageUrl: 'http://books.google.com/books/content?id=A_1oCAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api',
    dateRead: `${currentYear}-08-03`,
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
    dateRead: `${currentYear}-08-09`,
    review: 'Interesting series',
    availableToBorrow: true,
    genre: 'fiction',
    star: false,
    id: 'ffd9e79a-176c-4b28-a4db-91976886f748',
  },
]

export const mockMessages = [
  { 
    message: `Dave accepted your request to borrow Dune, get in touch now to organise collection!`,
    type: 'resolved',
    createdAt: '1609064197445'
  },
  {
    message: `Andre wants to borrow What Woman Want.`, 
    book: '1', 
    title: 'What Woman Want', 
    type: 'bookRequest', 
    senderId: '5', 
    createdAt: '1609064197441'
  },
  {
    message: `Matt wants to add you as a friend.`, 
    type: 'friendRequest', 
    senderId: '3', 
    createdAt: '1609064197449'
  }
]

export const mockFriends = ['sdkjsdffja182', 'asd81yeah', 'sdhaud11929312']
export const friendId = '5fbd572aa93f503ce439ca8f' 
export const bookId = 'c20f966f-df6f-4e16-9d85-64860ac36a73'

export const mockedSearchedBooks = {
  items: [
    { 
      volumeInfo: {
        authors: ["Suzanne Collins"],
        categories: ["Juvenile Fiction"],
        description: "This Special Edition of The Hunger Games includes the most extensive interview Suzanne Collins has given since the publication of The..",
        imageLinks: { thumbnail: "http://books.google.com/books/content?id=Yz8Fnw0PlEQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" },
        title: "The Hunger Games: Special Edition"
      }
    },
    { 
      volumeInfo: {
        authors: ["Suzanne Collins"],
        categories: ["Juvenile Fiction"],
        description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place...",
        imageLinks: { thumbnail: "http://books.google.com/books/content?id=c9RGBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api" },
        title: "The Hunger Games Complete Trilogy"
      }
    },
  ],
}

export const mockedResults = [
  {
    authors: ["Suzanne Collins"],
    description: "This Special Edition of The Hunger Games includes the most extensive interview Suzanne Collins has given since the publication of The..",
    genre: "Juvenile Fiction",
    imageUrl: "http://books.google.com/books/content?id=Yz8Fnw0PlEQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "The Hunger Games: Special Edition"
  },
  {
    authors: ["Suzanne Collins"],
    description: "Set in a dark vision of the near future, a terrifying reality TV show is taking place...",
    genre: "Juvenile Fiction",
    imageUrl: "http://books.google.com/books/content?id=c9RGBAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
    title: "The Hunger Games Complete Trilogy"
  }
]