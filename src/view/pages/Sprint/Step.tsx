import React from 'react';

import { words as wordsApi } from '../../../model/api/public';

import DIContainer from '../../../DI/DIContainer';
import DI_TYPES from '../../../DI/DITypes';

import { FILES_STORAGE_HOST } from '../../../core/constants';
import { ISprintGame } from '../../../services/interfaces/ISprintGame';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import AudioPlayer from '../../components/AudioPlayer';
import { Typography } from '@mui/material';

type StepProps = {
  rightAnswer: string;
  opinion: string;
}

const Step = ({ rightAnswer, opinion }: StepProps) => {
  const { data: word } =  wordsApi.useReadWordQuery({ wordId: rightAnswer });
  const { data: opinionWord } =  wordsApi.useReadWordQuery({ wordId: opinion });

  const gameService = DIContainer.get<ISprintGame>(DI_TYPES.SprintGame);

  return (
    <Box>
      { !word || !opinionWord
        ? <CircularProgress />
        :<>
          <Box display="flex" justifyContent="center" alignItems="center">
            <AudioPlayer tracks={[`${FILES_STORAGE_HOST}/${word.audio}`]} />
          </Box>
          <Box className='word'>
            <Typography variant='subtitle1' className="word-english">{opinionWord.wordTranslate}</Typography>
          </Box>
          
          <Box className="answers-btn">
            <Button variant="contained" onClick={gameService.makeOpinionYes.bind(gameService)}>
              Yes
            </Button>
            <Button variant="contained" onClick={gameService.makeOpinionNo.bind(gameService)}>
              No
            </Button>
          </Box>
        </>
      }
    </Box>   
  );
}

export default Step;