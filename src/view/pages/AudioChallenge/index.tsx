import React, { useEffect } from 'react';

import '/src/styles/css/game.css';

import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import DIContainer from '../../../DI/DIContainer';
import DI_TYPES from '../../../DI/DITypes';
import { IAudioChallengeGame } from '../../../services/interfaces/IAudioChallengeGame';

import { Box, Container } from '@mui/material';

import {
  selectState as selectGameState,
  isGameInStartScreenStage,
  isGameInRunningStage,
} from '../../../model/feature/audiochallenge';

import StartScreen from './StartScreen';
import { Game } from './Game';

const Audiocall = () => {
  const gameService: IAudioChallengeGame = DIContainer.get(DI_TYPES.AudioChallengeGame);

  const { group, page } = useParams();

  useEffect(() => {
    if (group !== undefined && page !== undefined) {
      gameService.startWithParams({ group: +group, page: +page });
    } else {
      gameService.startWithSettingsScreen();
    }

    return gameService.destroy.bind(gameService);
  }, []);

  const gameState = useSelector(selectGameState);


  return (
    <>
      <Box className="game-container">
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box className="game-wrapper">
            {isGameInStartScreenStage(gameState) && <StartScreen screenState={gameState.stage} />}
            {isGameInRunningStage(gameState) && <Game steps={gameState.stage.steps} currentStep={gameState.stage.currentStep} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Audiocall;
