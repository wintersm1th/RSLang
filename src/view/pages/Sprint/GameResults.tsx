import React from 'react';

import { FinishedStage } from '../../../model/feature/sprint';

import Box from '@mui/material/Box';

type GameResultsProps = {
  results: FinishedStage
}

const GameResults = ({ results }: GameResultsProps) => {  
  return (
    <Box>
      <ul>
        { results.steps.map((step, stepIndex) => {
          return (
            <li key={stepIndex}>
              Result: {step.result ? 'Success' : 'Fail'}
              <br/>
              Right answer: {step.answer}
              <br/>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}

export default GameResults;