import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react';

const API_ADDRESS = 'https://react-learnwords-example.herokuapp.com';

export const baseApi = createApi({
  reducerPath: 'api',
  tagTypes: ['User', 'Word', 'UserWord', 'Setting', 'Statistic'],
  baseQuery: fetchBaseQuery({
    baseUrl: API_ADDRESS
  }),
  endpoints: () => ({})
});
