import React from 'react';
import { useSelector } from 'react-redux';
import userSlice from '../../../model/feature/user';
import { RootState } from '../../../model/store';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';

import { Link } from 'react-router-dom';
import AuthModal from '../AuthModal';
import UserLink from "../UserLink";

const Header = () => {
  const userInfo = useSelector((state: RootState) => state[userSlice.name]);

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Button component={Link} to="/" color="inherit">
          Главная
        </Button>
        <Button component={Link} to="/dictionary" color="inherit">
          Словарь
        </Button>
        <Button component={Link} to="/games" color="inherit">
          Мини-игры
        </Button>
        <Button component={Link} to="/stats" color="inherit">
          Статистика
        </Button>
        <Button component={Link} to="/team" color="inherit">
          О команде
        </Button>
      </Toolbar>
      {userInfo.name?.length ? <UserLink /> : <AuthModal />}
    </AppBar>
  );
};

export default Header;
