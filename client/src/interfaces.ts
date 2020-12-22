export interface Book {
  title: string;
  authors: string[];
  imageUrl: string;
  dateRead: Date;
  review: string;
  availableToBorrow: boolean;
  genre: string;
  star: boolean;
  id: string;
}