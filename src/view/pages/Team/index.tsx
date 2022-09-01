import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { TeamCard } from '../../components/teamcard/teamcard';
import './team.css';

const Team = () => {
  return (
    <Container className='container-team'>
      <Box className='team-wrapper'>
        <Typography margin="40px auto" variant="h2" className='team-title'>
          Наша команда
        </Typography>
        <Box className='team-members'>
          <TeamCard imgSrc='/assets/img/team-page/sergei.jpg' name='Сергей' role='Team Lead. Developer' description='Большой молодец' git='StraightToJaneStreet'></TeamCard>
          <TeamCard imgSrc='/assets/img/team-page/ruslan.jpg' name='Руслан' role='Developer' description='Большой молодец' git='laiker'></TeamCard>
          <TeamCard imgSrc='/assets/img/team-page/alexei.jpg' name='Алексей' role='Developer' description='Большой молодец' git='AlexeiKozovski'></TeamCard>
        </Box>        
      </Box>
    </Container>
  );
};

export default Team;
