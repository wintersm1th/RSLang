import { configureStore } from '@reduxjs/toolkit';

import { slice as loginFormSlice } from './feature/forms/login';
import { slice as registrationFormSlice } from './feature/forms/registration';
import pageSlice from './feature/dictionary';
import userSlice from './feature/auth';
import { slice as audioChallengeSlice } from './feature/audiochallenge';
import { baseApi as publicApi } from './api/public';
import { baseApi as privateApi } from './api/private';

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [loginFormSlice.name]: loginFormSlice.reducer,
    [registrationFormSlice.name]: registrationFormSlice.reducer,
    [pageSlice.name]: pageSlice.reducer,
    [audioChallengeSlice.name]: audioChallengeSlice.reducer,
    [publicApi.reducerPath]: publicApi.reducer,
    [privateApi.reducerPath]: privateApi.reducer,
  },

  middleware: (gDM) => {
    return gDM().concat(privateApi.middleware).concat(publicApi.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
