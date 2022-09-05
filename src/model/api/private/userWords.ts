import { baseApi } from './baseApi';

import { UserWordParameters } from '../../../services/interfaces/IWordsService';
import { WordDifficulty } from '../../../core/WordDifficulty';

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
  optional?: UserWordPayload;
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
  difficulty: WordDifficulty;
  payload?: UserWordPayload;
};

export type CreateUserWordResponse = {
  id: string;
  wordId: string;
  difficulty: WordDifficulty;
  payload?: UserWordPayload;
};

export type UserWordPayload = UserWordParameters;

export type UserWord = {
  difficulty: WordDifficulty;
  optional: UserWordPayload;
};

export type GetUserWordArg = {
  id: string;
  wordId: string;
};

export type GetUserWordsResponse = GetUserWordResponse[];

export type GetUnlearnedWordsArg = {
  userId: string;
  group: number;
  page: number;
}

export type AggregatedWord = {
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord?: {
    difficulty: WordDifficulty;
  }
}

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
          optional,
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

    getAggregatedWords: build.query<AggregatedWord[], GetUnlearnedWordsArg>({
      transformResponse(baseQueryReturnValue, _meta, _arg) {
        console.log('BaseQueryReturn', baseQueryReturnValue);
        return [] as AggregatedWord[];
      },
      query: ({ userId, group, page }) => ({
        url: `/users/${userId}/aggregatedWords`,
        params: {
          group,
          wordsPerPage: 60000,
          filter: { "page": { $eq: page }}
        }
      })
    })
  }),
});
