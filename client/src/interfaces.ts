export interface Book {
  imageUrl: string;
}

export interface Action {
  type?: string;
  payload?: any;
}

export interface Target {
  target?: number | null
}