import React from 'react';
import { useSelector } from 'react-redux';

import DIContainer from '../../../DI/DIContainer';
import DI_TYPES from '../../../DI/DITypes';

import { selectState as selectAuthParams } from '../../../model/feature/userAuthParams';

import IWord from '../../../core/IWord';

import IWordsService from '../../../services/interfaces/IWordsService';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

const imagePath = (img: string) => `https://react-learnwords-example.herokuapp.com/${img}`;

type WordCardProps = {
  word: IWord;
};

const WordCard = ({ word }: WordCardProps) => {
  const wordsService: IWordsService = DIContainer.get(DI_TYPES.WordsService);
  const { user: auth } = useSelector(selectAuthParams);

  const handleAddToDifficult = () => {
    console.log('WordId:', word.id);
    wordsService.setWordDifficultMark(word.id);
  };

  const handleAddToLearned = () => {
    wordsService.setWordDifficultMark(word.id);
  };

  return (
    <Card>
      {word.image && <CardMedia image={imagePath(word.image)} sx={{ height: 200 }} />}
      <CardContent>
        <ul>
          <li>Id: {word.id}</li>
          <li>Word:{word.word}</li>
          <li>Translation: {word.wordTranslate}</li>
        </ul>
      </CardContent>
      <CardActions>
        {auth && (
          <>
            <Button variant={'contained'} onClick={handleAddToLearned}>
              Изученное
            </Button>
            <Button variant={'contained'} onClick={handleAddToDifficult}>
              Сложное
            </Button>
          </>
        )}
      </CardActions>
    </Card>
  );
};

export default WordCard;
