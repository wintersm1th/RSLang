import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../model/store';

const Main = () => {
  const message = useSelector((state: RootState) => state.message);
  return (
    <div className="application">
      <h1>{message}</h1>
    </div>
  );
};

export default Main;
