import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { langApiBase } from '../generated/langApiBase';
import errorResponseSlice from './feature/auth';
import userSlice from './feature/user';

const store = configureStore({
  reducer: combineReducers({
    [langApiBase.reducerPath]: langApiBase.reducer,
    [errorResponseSlice.name]: errorResponseSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  }),

  middleware: (gDM) => gDM().concat(langApiBase.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
