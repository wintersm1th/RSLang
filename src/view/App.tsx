import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from '../model/store';

import Main from './pages/Main';
import Games from './pages/Games';
import Dictionary from './pages/Dictionary';

export default function WrappedMain() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path="dictionary" element={<Dictionary />} />
            <Route path="games" element={<Games />}>
              <Route path="sprint" element={<h1>Sprint game</h1>} />
              <Route path="second" element={<h1>Second game</h1>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}
