import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Footer from '../../../components/footer/footer';

const Main = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <AppBar position="sticky">
        <Toolbar>
          <Button component={Link} to="/dictionary" color="inherit">
            Dictionary
          </Button>
          <Button component={Link} to="/games" color="inherit">
            Games
          </Button>
        </Toolbar>
      </AppBar>
      <Box>
        <Outlet />
      </Box>
      <Footer />
    </Box>
  );
};

export default Main;
