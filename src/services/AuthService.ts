import { Auth, langApi } from '../generated/services/langApi';
import store from '../model/store';
import { injectable } from 'inversify';
import { clearMessage, setAuthMessage, successAuth } from '../model/feature/auth';
import IAuthService from './interfaces/IAuthService';
import IAuthParams from './interfaces/IAuthParams';
import { clearUserInfo, setUserInfo } from '../model/feature/userAuthParams';
import IUserInfo from './interfaces/IUserInfo';
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
  async authorize(params: IAuthParams): Promise<boolean> {
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

        store.dispatch(successAuth());
        clearMessage();

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

      store.dispatch(setAuthMessage(message));

      return false;
    });
  }

  start(): void {
    const storagedUserParams = localStorage.getItem(LOCAL_STORAGE_AUTH_KEY);

    if (storagedUserParams !== null) {
      const userInfo: IUserInfo = JSON.parse(storagedUserParams);
      this.login(userInfo);
    }
  }

  login(authParams: IUserInfo) {
    store.dispatch(setUserInfo(authParams));
  }

  logout(): void {
    store.dispatch(clearUserInfo());
    localStorage.removeItem(LOCAL_STORAGE_AUTH_KEY);
  }
}
