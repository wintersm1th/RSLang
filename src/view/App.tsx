import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import store from '../model/store';

import Main from './pages/Main';
import Games from './pages/Games';
import Dictionary from './pages/Dictionary';
import Sprint from './pages/Sprint';
import Audiocall from './pages/Audiocall';
import Footer from './components/footer/footer';
import Header from './components/header/Header';
import Team from './pages/Team';
import Statistics from './pages/Statistics';


export default function WrappedMain() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="dictionary" element={<Dictionary />} />
          <Route path="games" element={<Games />} />
          <Route path="games/sprint" element={<Sprint />} />
          <Route path="games/audiocall" element={<Audiocall />} />
          <Route path="stats" element={<Statistics />} />
          <Route path="team" element={<Team />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>
  );
}
