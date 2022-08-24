import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { RootState } from "../store";

import { selectState as selectUserAuthParams } from '../feature/userAuthParams';

export type User = {
  name: string;
  email: string;
  password: string;
};

export type ArgUserId = {
  id: string;
}

export type UserWordPayload = {
  value: string;
}

export type UserWord = {
  difficulty: string;
  optional: UserWordPayload;
}

export type GetUserWordsArg = {
  id: string;
}
export type GetUserWordResponse = {
  id: string;
  wordId: string;
  difficulty: string;
  optional: UserWordPayload;
}
export type GetUserWordsResponse = GetUserWordResponse[];

export type PostUserWordsArg = {
  id: string;
  wordId: string;
  difficulty: string;
  payload: UserWordPayload;
}

export type PostUserWordsResponse = {
  id: string;
  wordId: UserWordPayload;
}

export type DeleteUserWordsArg = {
  id: string;
  wordId: string;
}

const enpointsWithAuthorization = [
  'getUserWords',
  'postUserWords'
]

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['UserWords'],
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
    }
  }),
  endpoints: (builder) => ({
    getUserWords: builder.query<GetUserWordsResponse, ArgUserId>({
      providesTags: ['UserWords'],
      query: ({ id }) => ({
        url: `/users/${id}/words`,
        method: 'GET'
      })
    }),

    postUserWords: builder.mutation<PostUserWordsResponse, PostUserWordsArg>({
      invalidatesTags: ['UserWords'],
      query: ({ id, wordId, difficulty, payload }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          difficulty,
          optional: payload,
        })
      })
    }),

    deleteUserWords: builder.mutation<void, DeleteUserWordsArg>({
      invalidatesTags: ['UserWords'],
      query: ({ id, wordId}) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'DELETE',
      })
    })
  })
});
