import { langApi } from "../generated/services/langApi";
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
    return sub.then((data) => {
      if ('error' in data) {
        const errResponse = data as {error: FetchBaseQueryError | SerializedError};
        const message = 'data' in errResponse.error ? errResponse.error.data : 'message' in errResponse.error ? errResponse.error.message : 'Неизвестная ошибка';
        store.dispatch(setAuthMessage(message as string));
        return false;
      } else {
        const userInfo = data.data as IUserInfo;
        store.dispatch(successAuth());
        this.setUserData(userInfo);
        return true;
      }
    })
  }
  start(): void {
    const userInfo= JSON.parse(localStorage.getItem('userInfo') as string);
    this.setUserData(userInfo);
  }
  protected setUserData(userInfo: IUserInfo) {
    store.dispatch(setUserInfo({ name: userInfo?.name, userId: userInfo?.userId, token: userInfo?.token, refreshToken: userInfo?.refreshToken }))
  }
}