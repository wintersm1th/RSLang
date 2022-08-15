import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { langApiBase } from '../generated/langApiBase';
// import { langApi } from '../generated/services/langApi';

const store = configureStore({
  reducer: combineReducers({
    [langApiBase.reducerPath]: langApiBase.reducer
  }),

  middleware: (gDM) =>
    gDM()
    .concat(langApiBase.middleware)

});

export type RootState = ReturnType<typeof store.getState>;

export default store;
