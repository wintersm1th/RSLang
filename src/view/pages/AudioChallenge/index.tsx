import React from 'react';

import '/src/styles/css/game.css';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';

import DIContainer from '../../../DI/DIContainer';
import DI_TYPES from '../../../DI/DITypes';

import { selectState as selectAuthState } from '../../../model/feature/auth';

import { IAudioChallengeGame } from '../../../services/interfaces/IAudioChallengeGame';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import {
  selectState as selectGameState,
  isGameInStartScreenStage,
  isGameInRunningStage,
  isGameInFinishedStage,
} from '../../../model/feature/audiochallenge';

import StartScreen from './StartScreen';
import Game from './Game';
import GameResults from './GameResults';

const AudioChallenge = () => {
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
            {isGameInStartScreenStage(gameState) &&
              <StartScreen
                group={gameState.stage.group}
                page={gameState.stage.page}
                setGroup={gameService.selectGroup.bind(gameService)}
                setPage={gameService.selectPage.bind(gameService)}
                startGame={gameService.startGame.bind(gameService)}
              />
            }
            {isGameInRunningStage(gameState) && <Game steps={gameState.stage.steps} currentStep={gameState.stage.currentStep} />}
            {isGameInFinishedStage(gameState) && <GameResults results={gameState.stage} />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

const AudioChallengeWrapper = () => {
  const { user } = useSelector(selectAuthState);
  
  return (
    <>
      { !user
        ? <Typography>Вы должны быть авторизированы для просмотра данной страницы</Typography>
        : <AudioChallenge />
      }
    </>
  );
}

export default AudioChallengeWrapper;
