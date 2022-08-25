import { injectable } from 'inversify';

import IAuth from '../core/IAuth';

import store from '../model/store';
import { slice as loginFormSlice } from '../model/feature/forms/login';
import { Auth, langApi } from '../generated/services/langApi';

import IAuthService, { AuthorizeParams } from './interfaces/IAuthService';

import { clearAuth, selectState, setAuth } from '../model/feature/userAuthParams';

import {
  isCustomError,
  isFetchError,
  isParsingError,
  isSerializedError,
  isSuccessResponse,
  isUnknownError,
} from './utils/ErrorResposne';

import { LOCAL_STORAGE_AUTH_KEY } from '../core/constants';

@injectable()
export default class AuthService implements IAuthService {
  async authorize(params: AuthorizeParams): Promise<boolean> {
    const result = langApi.endpoints.postSignin.initiate({ body: params });
    const sub = store.dispatch(result);

    return sub.then((response) => {
      if (isSuccessResponse<Auth>(response)) {
        const { userId, name, token, refreshToken } = response.data as Required<Auth>;

        this.login({
          name,
          token,
          refreshToken,
          id: userId,
        });

        const { success } = loginFormSlice.actions;
        store.dispatch(success('Вы успешно авторизовались'));      

        return true;
      }

      const error = response.error;

      let message = '';

      if (isSerializedError(error)) {
        message = error.message ?? 'Неизвестная ошибка';
      } else if (isUnknownError(error)) {
        message = 'Неизвестная ошибка';
      } else if (isParsingError(error)) {
        message = error.data ?? 'Неизвестная ошибка';
      } else if (isFetchError(error) || isCustomError(error)) {
        message = error.error;
      } else {
        throw Error('Undefined behavior');
      }

      const { fail } = loginFormSlice.actions;
      store.dispatch(fail(message));

      return false;
    });
  }

  start(): void {
    const storagedUserParams = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

    if (storagedUserParams !== null) {
      const auth: IAuth = JSON.parse(storagedUserParams);
      this.login(auth);
    }
  }

  login(auth: IAuth) {
    store.dispatch(setAuth(auth));
    localStorage.setItem(LOCAL_STORAGE_AUTH_KEY, JSON.stringify(auth));
  }

  logout(): void {
    store.dispatch(clearAuth());
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  }

  getAuth(): IAuth | null {
    const { user: params } = selectState(store.getState());
    return params;
  }
}
