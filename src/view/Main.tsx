import React from 'react';
import { useGetWordsQuery, Word } from '../generated/services/langApi';

const imagePath = (img: string) => `https://react-learnwords-example.herokuapp.com/${img}`;

const Word = ({ word }: { word: Word }) => (
  <div className="word">
    { word.image &&
      <img src={imagePath(word.image)} alt="" />
    }
    <ul>
      <li>
        Id: {word.id}
      </li>
      <li>
        Word:{word.word}
      </li>
      <li>
        Translation: {word.wordTranslate}
      </li>
    </ul>
  </div>
);

const Main = () => {
  const { data: words, isLoading } = useGetWordsQuery({});

  return (
    <div className="application">
      {isLoading && <h1>Loading</h1>}
      { words &&
        words.map((word) => <Word word={word}/>)
      }
    </div>
  );
};

export default Main;
