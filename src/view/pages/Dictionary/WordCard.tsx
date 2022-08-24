import React from 'react';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';

import { Word } from '../../../generated/services/langApi';

const imagePath = (img: string) => `https://react-learnwords-example.herokuapp.com/${img}`;

type WordCardProps = {
  word: Word;
}

const WordCard = ({ word }: WordCardProps) => {
  const handleAddToDifficult = () => {};
  const handleAddToFavorite = () => {};
  
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
        <Button variant={'contained'} onClick={handleAddToFavorite}>Сложное</Button>
        <Button variant={'contained'} onClick={handleAddToDifficult}>Избранное</Button>
      </CardActions>
    </Card>
  );
}

export default WordCard;
