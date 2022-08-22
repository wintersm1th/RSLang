import React from 'react';
import { Link, Outlet } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import AuthModal from '../../components/AuthModal';
import { useSelector } from "react-redux";
import { RootState } from "../../../model/store";
import userSlice from "../../../model/feature/user";

const Main = () => {
  const userInfo = useSelector((state: RootState) => state[userSlice.name]);
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
        { userInfo.name?.length ? userInfo.name : <AuthModal /> }
      </AppBar>
      <Box>
        <Outlet />
      </Box>
    </Box>
  );
};

export default Main;
