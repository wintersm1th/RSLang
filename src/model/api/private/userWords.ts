import { baseApi } from './baseApi';

import { UserWordParameters } from '../../../services/interfaces/IWordsService';

export type ArgUserId = {
  id: string;
};

export type GetUserWordResponse = {
  id: string;
  wordId: string;
  difficulty: string;
  optional: UserWordPayload;
};

export type UpdateUserWordArg = {
  id: string;
  wordId: string;
  difficulty: string;
  optional: UserWordPayload;
};

export type UpdateUserWordResponse = {
  id: string;
  wordId: string;
  difficulty: string;
  optional: UserWordPayload;
};

export type GetUserWordsArg = {
  id: string;
};

export type DeleteUserWordsArg = {
  id: string;
  wordId: string;
};

export type CreateUserWordArg = {
  id: string;
  wordId: string;
  difficulty: string;
  payload: UserWordPayload;
};

export type CreateUserWordResponse = {
  id: string;
  wordId: UserWordPayload;
};

export type UserWordPayload = UserWordParameters;

export type UserWord = {
  difficulty: string;
  optional: UserWordPayload;
};

export type GetUserWordArg = {
  id: string;
  wordId: string;
};

export type GetUserWordsResponse = GetUserWordResponse[];

export const userWords = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUserWord: build.mutation<CreateUserWordResponse, CreateUserWordArg>({
      invalidatesTags: ['UserWord'],
      query: ({ id, wordId, difficulty, payload }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'POST',
        body: {
          difficulty,
          optional: payload,
        },
      }),
    }),

    readUserWords: build.query<GetUserWordsResponse, ArgUserId>({
      providesTags: ['UserWord'],
      query: ({ id }) => ({
        url: `/users/${id}/words`,
      }),
    }),

    readUserWord: build.query<GetUserWordResponse, GetUserWordArg>({
      providesTags: ['UserWord'],
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`,
      }),
    }),

    updateUserWord: build.mutation<UpdateUserWordResponse, UpdateUserWordArg>({
      invalidatesTags: ['UserWord'],
      query: ({ id, wordId, difficulty, optional }) => ({
        url: `users/${id}/words/${wordId}`,
        method: 'PUT',
        body: {
          difficulty,
          optional
        },
      }),
    }),

    deleteUserWord: build.mutation<void, DeleteUserWordsArg>({
      invalidatesTags: ['UserWord'],
      query: ({ id, wordId }) => ({
        url: `/users/${id}/words/${wordId}`,
        method: 'DELETE',
      }),
    }),
  })
});
