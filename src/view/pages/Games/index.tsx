import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Games = () => {
  return (
    <>
      <h1>Games page</h1>
      <Link to="sprint">Sprint game</Link>
      <Link to="second">Sprint game</Link>
      <Outlet />
    </>
  );
};

export default Games;
