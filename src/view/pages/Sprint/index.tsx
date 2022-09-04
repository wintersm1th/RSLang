import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import '/src/styles/css/game.css';
import { SprintWord } from './sprintWord';
import MoodBadIcon from '@mui/icons-material/MoodBad';
import MoodIcon from '@mui/icons-material/Mood';
import SentimentNeutralIcon from '@mui/icons-material/SentimentNeutral';

const Sprint = () => {
  return (
    <Box className="game-container">
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Box className="game-wrapper">
          <Box className="word-card">
            <Box className="head">
              <h1>Спринт</h1>
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
            <SprintWord word={'word English'} answer={'word Translate'} />
            <Box className="answers-btn">
              <Button variant="contained" color="error">
                Неверно
              </Button>
              <Button variant="contained" color="success">
                Верно
              </Button>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Sprint;
