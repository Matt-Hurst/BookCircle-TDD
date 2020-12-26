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