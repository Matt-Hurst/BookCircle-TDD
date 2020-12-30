import axios from 'axios'
import { Book } from '../../interfaces';

export const getQueryResults = async (query: string, searchBy: string) :Promise<Book[]> => {
  const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=in${searchBy}:${query}&maxResults=40&printType=books&key=AIzaSyCPGabDlZJ8QKPihWNWfW-kl5yQtNFSlDc`)
  return data;
}