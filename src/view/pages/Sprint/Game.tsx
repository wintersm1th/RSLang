import React, { useEffect, useState } from 'react';

import DI_TYPES from '../../../DI/DITypes';
import DIContainer from '../../../DI/DIContainer';

import { Step } from '../../../model/feature/sprint';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { ISprintGame } from '../../../services/interfaces/ISprintGame';

import StepComponent from './Step';
import StepsStatusBar from './StepsStatusBar';

type GameProps = {
  steps: Step[],
  currentStep: number;
}

const MAXIMAL_GAME_DURATION = 30;

const Game = ({ steps, currentStep }: GameProps) => {
  const [ timeLeft, setTimeLeft ] = useState(MAXIMAL_GAME_DURATION);
  const { answer, variant } = steps[currentStep];

  const gameService = DIContainer.get<ISprintGame>(DI_TYPES.SprintGame);
  useEffect(() => {
    const interval = setInterval(() => {
      if (timeLeft > 1) {
        setTimeLeft(timeLeft - 1);
      } else if (timeLeft === 1) {        
        gameService.haltByTimeout();
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  return (
    <Box className="word-card">
      <Box className="head">
        <Typography variant='h2'>Аудиовызов</Typography>
        <Box className="top">
          <Typography variant="h5">Счет: {0}</Typography>
        </Box>
        <Typography>Осталось секунд: {timeLeft}</Typography>
        <StepsStatusBar steps={steps} />
        <StepComponent rightAnswer={answer} opinion={variant} />
      </Box>
    </Box>
  )
}

export default Game;