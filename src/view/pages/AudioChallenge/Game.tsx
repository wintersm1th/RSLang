import React from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { Step } from '../../../model/feature/audiochallenge';

import StepComponent from './Step';
import StepsStatusBar from './StepsStatusBar';

type GameProps = {
  steps: Step[],
  currentStep: number;
}

const Game = ({ steps, currentStep }: GameProps) => {
  const { answer, variants } = steps[currentStep];

  return (
    <Box className="word-card">
      <Box className="head">
        <Typography variant='h2'>Аудиовызов</Typography>
        <Box className="top">
          <Typography variant="h5">Счет: {0}</Typography>
        </Box>
        <StepsStatusBar steps={steps} />
        <StepComponent rightAnswer={answer} variantsIds={variants} />
      </Box>
    </Box>
  )
}

export default Game;