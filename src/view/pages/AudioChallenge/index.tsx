import React, { useEffect } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import AudioPlayer from '../../components/AudioPlayer';
import '/src/styles/css/game.css';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';
import MoodIcon from '@mui/icons-material/Mood';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import { useSelector } from 'react-redux';
import DIContainer from '../../../DI/DIContainer';
import DI_TYPES from '../../../DI/DITypes';
import { IAudioChallengeGame } from '../../../services/interfaces/IAudioChallengeGame';
import {
  selectState as selectGameState,
  isGameInStartScreenStage,
  isGameInRunningStage,
} from '../../../model/feature/audiochallenge';
import StartScreen from './StartScreen';
import { useParams } from 'react-router';

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
            {isGameInRunningStage(gameState) && (
              <Box className="word-card">
                <Box className="head">
                  <h1>Аудиовызов</h1>
                  <Box className="top">
                    <Typography variant="h5">Счет: {0}</Typography>
                  </Box>
                  <Box className={'series-answers series--' + 1}>
                    <MoodBadIcon fontSize="large" color="error" />
                    <MoodIcon fontSize="large" color="success" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                    <SentimentNeutralIcon fontSize="large" color="info" />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="center" alignItems="center">
                  <AudioPlayer tracks={['https://www.audio-lingua.eu/IMG/mp3/torin.mp3']} />
                </Box>
                <Box className="answers-btn">
                  <Button variant="contained" color="error">
                    Слово 1
                  </Button>
                  <Button variant="contained" color="success">
                    Слово 2
                  </Button>
                  <Button variant="contained">Слово 3</Button>
                  <Button variant="contained">Слово 4</Button>
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Audiocall;
