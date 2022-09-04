import React, { FC } from 'react';

interface SprintWordProps {
  word: string;
  answer: string;
}

export const SprintWord: FC<SprintWordProps> = ({ word, answer }) => {
  return (
    <div className="word">
      <span className="word-english">{word}</span>
      <span className="answer">{answer}</span>
    </div>
  );
};
