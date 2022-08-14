import React from 'react';

import { Provider } from 'react-redux';

import store from '../model/store';

import Main from './Main';

export default function WrappedMain() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
