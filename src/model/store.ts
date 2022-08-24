import { configureStore } from '@reduxjs/toolkit';
import { langApiBase } from '../generated/langApiBase';
import { api } from './service/api';

import errorResponseSlice from './feature/auth';
import userSlice from './feature/userAuthParams';

const store = configureStore({
  reducer: {
    [langApiBase.reducerPath]: langApiBase.reducer,
    [api.reducerPath]: api.reducer,
    [errorResponseSlice.name]: errorResponseSlice.reducer,
    [userSlice.name]: userSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(langApiBase.middleware).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
