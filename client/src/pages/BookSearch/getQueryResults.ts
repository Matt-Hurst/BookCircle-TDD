import axios from 'axios'
import { Book } from '../../interfaces';

interface Item {
  volumeInfo: {
    title: string;
    authors: string[];
    imageLinks: {
      thumbnail: string;
    }
    categories: string[];
    description?: string;
  }
}

export const getQueryResults = async (query: string, searchBy: string) :Promise<Book[]> => {
  const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=in${searchBy}:${query}&maxResults=40&printType=books&key=AIzaSyCPGabDlZJ8QKPihWNWfW-kl5yQtNFSlDc`)
  console.log(data)
  const results = data.items.map((item: Item ) => {
    return {
      title: item.volumeInfo.title ? item.volumeInfo.title : undefined,
      authors: item.volumeInfo.authors ? item.volumeInfo.authors : undefined,
      imageUrl: item.volumeInfo.imageLinks && item.volumeInfo.imageLinks.thumbnail ? item.volumeInfo.imageLinks.thumbnail : undefined,
      genre: item.volumeInfo.categories ? item.volumeInfo.categories[0] : undefined,
      description: item.volumeInfo.description ? item.volumeInfo.description : undefined
    }
  })
  return results;
}