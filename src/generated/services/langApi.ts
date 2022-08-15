import { langApiBase as api } from '../langApiBase';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getWords: build.query<GetWordsApiResponse, GetWordsApiArg>({
      query: (queryArg) => ({ url: `/words`, params: { group: queryArg.group, page: queryArg.page } }),
    }),
    getWordsById: build.query<GetWordsByIdApiResponse, GetWordsByIdApiArg>({
      query: (queryArg) => ({ url: `/words/${queryArg.id}` }),
    }),
    postUsers: build.mutation<PostUsersApiResponse, PostUsersApiArg>({
      query: (queryArg) => ({ url: `/users`, method: 'POST', body: queryArg.body }),
    }),
    getUsersById: build.query<GetUsersByIdApiResponse, GetUsersByIdApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}` }),
    }),
    putUsersById: build.mutation<PutUsersByIdApiResponse, PutUsersByIdApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}`, method: 'PUT', body: queryArg.body }),
    }),
    deleteUsersById: build.mutation<DeleteUsersByIdApiResponse, DeleteUsersByIdApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}`, method: 'DELETE' }),
    }),
    getUsersByIdTokens: build.query<GetUsersByIdTokensApiResponse, GetUsersByIdTokensApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/tokens` }),
    }),
    getUsersByIdWords: build.query<GetUsersByIdWordsApiResponse, GetUsersByIdWordsApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/words` }),
    }),
    postUsersByIdWordsAndWordId: build.mutation<
      PostUsersByIdWordsAndWordIdApiResponse,
      PostUsersByIdWordsAndWordIdApiArg
    >({
      query: (queryArg) => ({
        url: `/users/${queryArg.id}/words/${queryArg.wordId}`,
        method: 'POST',
        body: queryArg.body,
      }),
    }),
    getUsersByIdWordsAndWordId: build.query<GetUsersByIdWordsAndWordIdApiResponse, GetUsersByIdWordsAndWordIdApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/words/${queryArg.wordId}` }),
    }),
    putUsersByIdWordsAndWordId: build.mutation<PutUsersByIdWordsAndWordIdApiResponse, PutUsersByIdWordsAndWordIdApiArg>(
      {
        query: (queryArg) => ({
          url: `/users/${queryArg.id}/words/${queryArg.wordId}`,
          method: 'PUT',
          body: queryArg.body,
        }),
      }
    ),
    deleteUsersByIdWordsAndWordId: build.mutation<
      DeleteUsersByIdWordsAndWordIdApiResponse,
      DeleteUsersByIdWordsAndWordIdApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/words/${queryArg.wordId}`, method: 'DELETE' }),
    }),
    getUsersByIdAggregatedWords: build.query<GetUsersByIdAggregatedWordsApiResponse, GetUsersByIdAggregatedWordsApiArg>(
      {
        query: (queryArg) => ({
          url: `/users/${queryArg.id}/aggregatedWords`,
          params: {
            group: queryArg.group,
            page: queryArg.page,
            wordsPerPage: queryArg.wordsPerPage,
            filter: queryArg.filter,
          },
        }),
      }
    ),
    getUsersByIdAggregatedWordsAndWordId: build.query<
      GetUsersByIdAggregatedWordsAndWordIdApiResponse,
      GetUsersByIdAggregatedWordsAndWordIdApiArg
    >({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/aggregatedWords/${queryArg.wordId}` }),
    }),
    getUsersByIdStatistics: build.query<GetUsersByIdStatisticsApiResponse, GetUsersByIdStatisticsApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/statistics` }),
    }),
    putUsersByIdStatistics: build.mutation<PutUsersByIdStatisticsApiResponse, PutUsersByIdStatisticsApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/statistics`, method: 'PUT', body: queryArg.body }),
    }),
    getUsersByIdSettings: build.query<GetUsersByIdSettingsApiResponse, GetUsersByIdSettingsApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/settings` }),
    }),
    putUsersByIdSettings: build.mutation<PutUsersByIdSettingsApiResponse, PutUsersByIdSettingsApiArg>({
      query: (queryArg) => ({ url: `/users/${queryArg.id}/settings`, method: 'PUT', body: queryArg.body }),
    }),
    postSignin: build.mutation<PostSigninApiResponse, PostSigninApiArg>({
      query: (queryArg) => ({ url: `/signin`, method: 'POST', body: queryArg.body }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as langApi };
export type GetWordsApiResponse = /** status 200 Successful operation */ Word[];
export type GetWordsApiArg = {
  /** group number */
  group?: string;
  /** page in the group */
  page?: string;
};
export type GetWordsByIdApiResponse = /** status 200 Successful operation */ Word;
export type GetWordsByIdApiArg = {
  /** wordId */
  id: string;
};
export type PostUsersApiResponse = /** status 200 Successful creation. */ User;
export type PostUsersApiArg = {
  body: {
    name?: string;
    email?: string;
    password?: string;
  };
};
export type GetUsersByIdApiResponse = /** status 200 Successful operation */ User;
export type GetUsersByIdApiArg = {
  /** userId */
  id: string;
};
export type PutUsersByIdApiResponse = /** status 200 The user has been updated. */ User;
export type PutUsersByIdApiArg = {
  /** userId */
  id: string;
  body: {
    email?: string;
    password?: string;
  };
};
export type DeleteUsersByIdApiResponse = unknown;
export type DeleteUsersByIdApiArg = {
  /** userId */
  id: string;
};
export type GetUsersByIdTokensApiResponse = /** status 200 Successful operation */ Auth;
export type GetUsersByIdTokensApiArg = {
  /** user id */
  id: string;
};
export type GetUsersByIdWordsApiResponse = /** status 200 Successful operation */ UserWord[];
export type GetUsersByIdWordsApiArg = {
  /** userId */
  id: string;
};
export type PostUsersByIdWordsAndWordIdApiResponse = /** status 200 The user word has been created. */ UserWord;
export type PostUsersByIdWordsAndWordIdApiArg = {
  /** userId */
  id: string;
  /** wordId */
  wordId: string;
  body: {
    difficulty?: string;
    optional?: any[];
  };
};
export type GetUsersByIdWordsAndWordIdApiResponse = /** status 200 Successful operation */ UserWord;
export type GetUsersByIdWordsAndWordIdApiArg = {
  /** userId */
  id: string;
  /** wordId */
  wordId: string;
};
export type PutUsersByIdWordsAndWordIdApiResponse = /** status 200 The user word has been updated. */ UserWord;
export type PutUsersByIdWordsAndWordIdApiArg = {
  /** userId */
  id: string;
  /** wordId */
  wordId: string;
  body: {
    difficulty?: string;
    optional?: any[];
  };
};
export type DeleteUsersByIdWordsAndWordIdApiResponse = unknown;
export type DeleteUsersByIdWordsAndWordIdApiArg = {
  /** userId */
  id: string;
  /** wordId */
  wordId: string;
};
export type GetUsersByIdAggregatedWordsApiResponse = /** status 200 Successful operation */ Word[];
export type GetUsersByIdAggregatedWordsApiArg = {
  /** userId */
  id: string;
  /** group(skip if you want result not depending on a group) */
  group?: string;
  /** page number */
  page?: string;
  /** words per page */
  wordsPerPage?: string;
  /** Filter by aggreagted word fields. It should be a stringified object which meet MongoDB Query object conditions.<br>
    Get all words that have difficulte="hard AND optional.key="value <pre>{"$and":[{"userWord.difficulty":"hard", "userWord.optional.key":"value"}]}</pre><br>
    Get all words that have difficulty equal="easy" OR do not have the linked userWord <pre>{"$or":[{"userWord.difficulty":"easy"},{"userWord":null}]}</pre><br>
    Get all words that have BOTH difficulty equal="easy" AND optional.repeat=true, OR do not have the linked userWord <pre>{"$or":[{"$and":[{"userWord.difficulty":"easy", "userWord.optional.repeat":true}]},{"userWord":null}]}</pre><br> */
  filter?: string;
};
export type GetUsersByIdAggregatedWordsAndWordIdApiResponse = /** status 200 Successful operation */ UserWord;
export type GetUsersByIdAggregatedWordsAndWordIdApiArg = {
  /** userId */
  id: string;
  /** wordId */
  wordId: string;
};
export type GetUsersByIdStatisticsApiResponse = /** status 200 Successful operation */ Statistic;
export type GetUsersByIdStatisticsApiArg = {
  /** userId */
  id: string;
};
export type PutUsersByIdStatisticsApiResponse = /** status 200 The statistics has been created. */ Statistic;
export type PutUsersByIdStatisticsApiArg = {
  /** userId */
  id: string;
  body: {
    learnedWords?: number;
    optional?: any[];
  };
};
export type GetUsersByIdSettingsApiResponse = /** status 200 Successful operation */ Setting;
export type GetUsersByIdSettingsApiArg = {
  /** userId */
  id: string;
};
export type PutUsersByIdSettingsApiResponse = /** status 200 The settings has been created. */ Setting;
export type PutUsersByIdSettingsApiArg = {
  /** userId */
  id: string;
  body: {
    wordsPerDay?: number;
    optional?: any[];
  };
};
export type PostSigninApiResponse = /** status 200 Successful login. */ Auth;
export type PostSigninApiArg = {
  body: {
    email?: string;
    password?: string;
  };
};
export type Word = {
  id?: string;
  group?: number;
  page?: number;
  word?: string;
  image?: string;
  audio?: string;
  audioMeaning?: string;
  audioExample?: string;
  textMeaning?: string;
  textExample?: string;
  transcription?: string;
  wordTranslate?: string;
  textMeaningTranslate?: string;
  textExampleTranslate?: string;
};
export type User = {
  name?: string;
  email?: string;
  password?: string;
};
export type Auth = {
  message?: string;
  token?: string;
  refreshToken?: string;
  userId?: string;
  name?: string;
};
export type UserWord = {
  difficulty?: string;
  optional?: any[];
};
export type Statistic = {
  learnedWords?: number;
  optional?: any[];
};
export type Setting = {
  wordsPerDay?: number;
  optional?: any[];
};
export const {
  useGetWordsQuery,
  useGetWordsByIdQuery,
  usePostUsersMutation,
  useGetUsersByIdQuery,
  usePutUsersByIdMutation,
  useDeleteUsersByIdMutation,
  useGetUsersByIdTokensQuery,
  useGetUsersByIdWordsQuery,
  usePostUsersByIdWordsAndWordIdMutation,
  useGetUsersByIdWordsAndWordIdQuery,
  usePutUsersByIdWordsAndWordIdMutation,
  useDeleteUsersByIdWordsAndWordIdMutation,
  useGetUsersByIdAggregatedWordsQuery,
  useGetUsersByIdAggregatedWordsAndWordIdQuery,
  useGetUsersByIdStatisticsQuery,
  usePutUsersByIdStatisticsMutation,
  useGetUsersByIdSettingsQuery,
  usePutUsersByIdSettingsMutation,
  usePostSigninMutation,
} = injectedRtkApi;
