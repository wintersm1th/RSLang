import { Auth, langApi } from '../generated/services/langApi';
import store from '../model/store';
import { injectable } from 'inversify';
import { clearMessage, setAuthMessage, successAuth } from '../model/feature/auth';
import IAuthService from './interfaces/IAuthService';
import IAuthParams from './interfaces/IAuthParams';
import { setUserInfo } from '../model/feature/user';
import IUserInfo from './interfaces/IUserInfo';
import {
  isCustomError,
  isFetchError,
  isParsingError,
  isSerializedError,
  isSuccessResponse,
  isUnknownError,
} from './utils/ErrorResposne';

@injectable()
export default class AuthService implements IAuthService {
  async authorize(params: IAuthParams): Promise<boolean> {
    const result = langApi.endpoints.postSignin.initiate({ body: params });
    const sub = store.dispatch(result);

    return sub.then((response) => {
      if (isSuccessResponse<Auth>(response)) {
        const { data: userInfo } = response;

        store.dispatch(successAuth());
        clearMessage();
        this.setUserData(userInfo);
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
    const userInfo = JSON.parse(localStorage.getItem('userInfo') as string);
    this.setUserData(userInfo);
  }

  logout(): void {
    this.setUserData({});
  }

  protected setUserData(userInfo: IUserInfo): void {
    const thunk = setUserInfo({
      name: userInfo?.name,
      userId: userInfo?.userId,
      token: userInfo?.token,
      refreshToken: userInfo?.refreshToken,
    });

    store.dispatch(thunk);
  }
}
