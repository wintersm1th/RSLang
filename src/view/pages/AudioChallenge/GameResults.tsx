import React from 'react';

import { FinishedStage } from '../../../model/feature/audiochallenge';

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
              Variants:
              <ul>
                {step.variants.map((variantId, variantIndex) => <li key={variantIndex}>Id: {variantId}</li>)}
              </ul>
            </li>
          );
        })}
      </ul>
    </Box>
  );
}

export default GameResults;