import { Auth, langApi } from "../generated/services/langApi";
import store from "../model/store";
import { injectable } from "inversify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { setAuthMessage, successAuth } from "../model/feature/auth";
import IAuthService from "./interfaces/IAuthService";
import IAuthParams from "./interfaces/IAuthParams";
import { setUserInfo } from "../model/feature/user";
import IUserInfo from "./interfaces/IUserInfo";

@injectable()
export default class AuthService implements IAuthService {
  async authorize(params: IAuthParams): Promise<boolean> {
    const result = langApi.endpoints.postSignin.initiate({body: params});
    const sub = store.dispatch(result);
    return sub.then((response) => {
      if (this.isSuccessResponse(response)) {
        const userInfo = response.data as IUserInfo;
        store.dispatch(successAuth());
        this.setUserData(userInfo);
        return true;
      } else {
        const message = 'data' in response.error ? response.error.data as string : 'message' in response.error ? response.error.message as string : 'Неизвестная ошибка';
        store.dispatch(setAuthMessage(message));
        return false;
      }
    })
  }
  start(): void {
    const userInfo= JSON.parse(localStorage.getItem('userInfo') as string);
    this.setUserData(userInfo);
  }

  protected isSuccessResponse(response: {data: Auth} | {error: FetchBaseQueryError | SerializedError }): response is {data: Auth}
  {
    return (response as {data: Auth}).data !== undefined;
  }
  protected setUserData(userInfo: IUserInfo): void {
    store.dispatch(setUserInfo({ name: userInfo?.name, userId: userInfo?.userId, token: userInfo?.token, refreshToken: userInfo?.refreshToken }))
  }
}