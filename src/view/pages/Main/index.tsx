import React from 'react';
import { Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';

const Main = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <h1>Hello Main!</h1>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
