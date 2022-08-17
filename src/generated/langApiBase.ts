import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const langApiBase = createApi({
  reducerPath: 'langApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://react-learnwords-example.herokuapp.com' }),
  endpoints: () => ({}),
});
