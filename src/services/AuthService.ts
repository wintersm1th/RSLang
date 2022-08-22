import { Auth, langApi } from "../generated/services/langApi";
import store from "../model/store";
import { injectable } from "inversify";
import { setAuthMessage, successAuth } from "../model/feature/auth";
import IAuthService from "./interfaces/IAuthService";
import IAuthParams from "./interfaces/IAuthParams";
import { setUserInfo } from "../model/feature/user";
import IUserInfo from "./interfaces/IUserInfo";
import { isKnownError, isParsingError, isSerializedError, isSuccessResponse } from "./utils/ErrorResposne";

@injectable()
export default class AuthService implements IAuthService {
  async authorize(params: IAuthParams): Promise<boolean> {
    const result = langApi.endpoints.postSignin.initiate({body: params});
    const sub = store.dispatch(result);

    return sub.then((response) => {
      if (isSuccessResponse<Auth>(response)) {
        const userInfo = response.data as IUserInfo;
        store.dispatch(successAuth());
        this.setUserData(userInfo);
        return true;
      }

      let message: string = '';

      if (isSerializedError(response.error)) {
        message = response.error.message ?? 'Неизвестная ошибка';
      } else if (isParsingError(response.error)) {
        message = response.error.data
      } else if (isKnownError(response.error)) {
        message = response.error.error;
      } else {
        message = 'Неизвестная ошибка';
      }

      store.dispatch(setAuthMessage(message));
      return false;
    })
  }
  start(): void {
    const userInfo= JSON.parse(localStorage.getItem('userInfo') as string);
    this.setUserData(userInfo);
  }

  protected setUserData(userInfo: IUserInfo): void {
    store.dispatch(setUserInfo({ name: userInfo?.name, userId: userInfo?.userId, token: userInfo?.token, refreshToken: userInfo?.refreshToken }))
  }
}

