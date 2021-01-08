import React, { useEffect } from 'react'
import ReactWordcloud from 'react-wordcloud'
import { Book } from '../../interfaces';

interface WordCloudProps {
  books: Book[];
}

interface Genres {
  text: string;
  value: number;
}

interface Options {
  rotations: number;
  rotationAngles: [number, number];
  fontSizes: [number, number];
  transitionDuration: number;
}

const WordCloud: React.FC<WordCloudProps> = ({books}) => {

  const genres: Genres[] = [
    {
      text: 'fiction',
      value: 0
    },
    {
      text: 'non-fiction',
      value: 0
    },
    {
      text: 'crime',
      value: 0
    },
    {
      text: 'science fiction',
      value: 0
    },
    {
      text: 'fantasy',
      value: 0
    },
    {
      text: 'action & adventure',
      value: 0
    },
    {
      text: 'politics & history',
      value: 0
    },
    {
      text: 'romance',
      value: 0
    },
    {
      text: 'comedy',
      value: 0
    },
    {
      text: 'science & technology',
      value: 0
    },
    {
      text: 'biography',
      value: 0
    },
    {
      text: 'arts & culture',
      value: 0
    },
    {
      text: 'self-improvement',
      value: 0
    },
  ]

  useEffect(() => {
    books.forEach((book: Book) => {
      let matched = false;
      let i: number = 0;
      while (!matched && i < books.length) {
        if(book.genre === genres[i].text) {
          genres[i].value += 1
          matched = true
        } else i += 1
      }
    }, [books])
  })
  
  const options: Options = {
    rotations: 2,
    rotationAngles: [-10, 0],
    fontSizes: [20,70],
    transitionDuration: 1000
  };

  const size: [number, number] = [200, 200];

  return (
    <div data-testid='word-cloud-wrapper'>
      <ReactWordcloud options={options} size={size} words={genres} />
    </div>
  )
}

export default WordCloud;