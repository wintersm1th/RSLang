import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import './sprint.css';
import { SprintWord } from './sprintWord';

const Sprint = () => {
  return (
    <Container className='sprint-container' sx={{ display: 'flex', alignItems: 'center' }}>
      <Box className='sprint-game'>
        <Box className='word-card'>
          <Box className='head'>
            <Box className='top'>
              <Typography variant='h5'>
                Счет: {0}
              </Typography>
            </Box>
            <Box className={'series-answers series--' + 1}>
              <span className='item item-1'></span>
              <span className='item item-2'></span>
              <span className='item item-3'></span>
            </Box>
          </Box>
          <SprintWord
            word={'word English'}
            answer={'word Translate'}
          />
          <Box className='answers-btn'>
            <Button variant='contained' color='error'>
              Неверно
            </Button>
            <Button variant='contained' color='success'>
              Верно
            </Button>
          </Box>
        </Box>
        


      </Box>


    </Container>
  );
};

export default Sprint;
