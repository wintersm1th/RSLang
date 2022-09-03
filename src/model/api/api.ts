import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

import { IWord } from '../../core/IWord';

import { RootState } from '../store';
import { selectState as selectUserAuthParams } from '../feature/auth';

export type User = {
  name: string;
  email: string;
  password: string;
};

export type ReadWordsArg = {
  group: string;
  page: string;
};

export type ReadWordResponse = IWord;

export type ReadWordsResponse = IWord[];

export type CreateUserArg = {
  name: string;
  email: string;
  password: string;
}

export type CreateUserResponse = {
  name: string;
  email: string;
  password: string;
}

export type SigninArg = {
  email: string;
  password: string;
}

export type SigninResponse = {
  userId: string;
  token: string;
  refreshToken: string;
  message: string;
  name: string;
}

const enpointsWithAuthorization = [
  'createUserWord',
  'readUserWords',
  'readUserWord',
  'updateUserWord',
  'deleteUserWord',
];

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['UserWord'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://react-learnwords-example.herokuapp.com',
    prepareHeaders(headers, { getState, endpoint }) {
      if (enpointsWithAuthorization.includes(endpoint)) {
        const state: RootState = getState() as RootState;
        const userAuthParams = selectUserAuthParams(state);
        if (userAuthParams.user !== null) {
          const { token } = userAuthParams.user;
          headers.set('Authorization', `Bearer ${token}`);
        }
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    readWords: build.query<ReadWordsResponse, ReadWordsArg>({
      query: ({ group, page }) => ({
        url: `/words`,
        params: {
          group,
          page,
        },
      }),
    }),

    createUser: build.mutation<CreateUserResponse, CreateUserArg>({
      query: ({ email, name, password }) => ({
        url: `/users`,
        method: 'POST',
        body: {
          email,
          name,
          password
        }
      }),
    }),

    signin: build.mutation<SigninResponse, SigninArg>({
      query: ({ email, password }) => ({
        url: `/signin`,
        method: 'POST',
        body: {
          email,
          password
        }
      }),
    }),
  }),
});
