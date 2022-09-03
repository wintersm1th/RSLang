import { api } from './baseApi';

import { User } from './shemas';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { RootState } from '../store';
import { selectState } from '../feature/auth';

type UnauthorizedRequestError = {
  status: 'CUSTOM_ERROR',
  error: string
}

const createAuthError = (): UnauthorizedRequestError => ({
  status: 'CUSTOM_ERROR',
  error: 'Не авторизирован'
});

type ReadUserArg = {
  id: string;
}

type CreateUserArg = {
  name: string;
  email: string;
  password: string;
}

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    readUser: build.query<User, ReadUserArg>({
      async queryFn({ id }, { getState }, _b, baseFetch) {
        const { user } = selectState(getState() as RootState);
        if (user === null) {
          return { error: createAuthError() };
        }

        const result = await baseFetch({
          url: `users/${id}`,
          headers: {
            'Authorization`': `Bearer ${user.token}`
          }
        });

        if ('data' in result) {
          return { data: { email: '', name: '', password: '' } as User };
        }
        else {
          return { error: result.error as FetchBaseQueryError }
        }
      }
    }),

    createUser: build.query<User, CreateUserArg>({
      query: ({ name, email, password}) => ({
        url: 'users',
        method: 'POST',
        body: {
          name,
          email,
          password
        }
      })
    })
  })
});