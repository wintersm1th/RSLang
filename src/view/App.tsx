import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from '../model/store';

import Main from './pages/Main';
import Games from './pages/Games';
import Dictionary from './pages/Dictionary';
import Sprint from './pages/Sprint';
import Audiocall from './pages/Audiocall';

export default function WrappedMain() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="games" element={<Games />} />
            <Route path="games/sprint" element={<Sprint />} />
            <Route path="games/audiocall" element={<Audiocall />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
