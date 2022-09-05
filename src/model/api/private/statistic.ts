import { Statistic } from '../shemas';
import { baseApi } from './baseApi';

type GetStatisticArg = {
  userId: string;
}

interface GetStatisticResponse extends Statistic {
  id: string;
};

type UpdateStatisticArg = {
  userId: string;
  payload: Statistic;
}

interface UpdateStatisticResponse extends Statistic {
  id: string;
};

export const statistic = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getStatistic: build.query<GetStatisticResponse, GetStatisticArg>({
      providesTags: ['Statistics'],
      query: ({ userId }) => ({
        url: `/users/${userId}/statistics`,
        method: 'GET'
      })
    }),
    
    updateStatistic: build.mutation<UpdateStatisticResponse, UpdateStatisticArg>({
      invalidatesTags: ['Statistics'],
      query: ({ userId, payload }) => ({
        url: `/users/${userId}/statistics`,
        method: 'PUT',
        body: payload
      })
    })
  }),
});
