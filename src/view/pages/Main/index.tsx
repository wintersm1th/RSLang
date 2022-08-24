import React from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

import Container from '@mui/material/Container';

const Main = () => {
  return (
    <Container>
      <h1>Hello Main!</h1>
      <Box>
        <Outlet />
      </Box>
    </Container>
  );
};

export default Main;
