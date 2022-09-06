import React from 'react';

import { Step } from '../../../model/feature/audiochallenge';

import Box from '@mui/material/Box';

import StepStatusIcon from './StepStatusIcon';

type StepsStatusBarProps = {
  steps: Step[]
}

const StepsStatusBar = ({ steps } : StepsStatusBarProps) => {
  return (
    <Box className={'series-answers series--' + 1}>
      { steps.map((step) => <StepStatusIcon step={step}/>) }
    </Box>
  );
}

export default StepsStatusBar;