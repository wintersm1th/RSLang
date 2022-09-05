import React from 'react';
import { useSelector } from 'react-redux';

import DIContainer from '../../../DI/DIContainer';
import DI_TYPES from '../../../DI/DITypes';

import { selectState as selectAuthParams } from '../../../model/feature/auth';

import IWord from '../../../core/IWord';

import IWordsService from '../../../services/interfaces/IWordsService';

import Button from '@mui/material/Button';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import AudioPlayer from '../../components/AudioPlayer';

import IAuth from '../../../core/IAuth';
import { GetUserWordResponse } from '../../../model/api/private/userWords';

import { Box } from '@mui/material';
import { WordDifficulty } from '../../../core/WordDifficulty';

const imagePath = (img: string) => `https://react-learnwords-example.herokuapp.com/${img}`;

type WordCardExtensionProps = {
  wordId: string;
  wordParams?: GetUserWordResponse;
  auth: IAuth;
};

const WordCardExtension = ({ wordId, auth: { id: userId }, wordParams }: WordCardExtensionProps) => {
  const wordsService: IWordsService = DIContainer.get(DI_TYPES.WordsService);

  const isAddToDifficultEnabled = wordParams?.difficulty !== WordDifficulty.HARD;
  const isAddToLearnedEnabled = wordParams?.difficulty !== WordDifficulty.LEARNED;

  const handleAddToDifficult = () => {
    wordsService.setWordHardMark(userId, wordId);
  };

  const handleAddToLearned = () => {
    wordsService.setWordLearnedMark(userId, wordId);
  };

  return (
    <>
      <Button variant={'contained'} onClick={handleAddToLearned} disabled={!isAddToLearnedEnabled}>
        Изученное
      </Button>

      <Button variant={'contained'} onClick={handleAddToDifficult} disabled={!isAddToDifficultEnabled}>
        Сложное
      </Button>
    </>
  );
};

type WordCardProps = {
  word: IWord;
  params?: GetUserWordResponse;
};

const WordCard = ({ word, params }: WordCardProps) => {
  const { user: auth } = useSelector(selectAuthParams);

  return (
    <Card>
      {word.image && <CardMedia image={imagePath(word.image)} sx={{ height: 200 }} />}
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <AudioPlayer
            tracks={['https://www.audio-lingua.eu/IMG/mp3/torin.mp3', 'https://www.audio-lingua.eu/IMG/mp3/samuel.mp3']}
          />
        </Box>
        <ul>
          <li>Id: {word.id}</li>
          <li>Word:{word.word}</li>
          <li>Translation: {word.wordTranslate}</li>
        </ul>
      </CardContent>

      <CardActions>{auth && <WordCardExtension auth={auth} wordId={word.id} wordParams={params} />}</CardActions>
    </Card>
  );
};

export default WordCard;
