import { configureStore } from '@reduxjs/toolkit';
import { langApiBase } from '../generated/langApiBase';
import { api } from './service/api';

import { slice as loginFormSlice } from './feature/forms/login';
import { slice as registrationFormSlice } from './feature/forms/registration';

import userSlice from './feature/auth';

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [loginFormSlice.name]: loginFormSlice.reducer,
    [registrationFormSlice.name]: registrationFormSlice.reducer,
    [langApiBase.reducerPath]: langApiBase.reducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (gDM) => gDM().concat(langApiBase.middleware).concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
