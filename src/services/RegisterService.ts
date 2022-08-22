import { langApi, User } from "../generated/services/langApi";
import IRegisterService from "./interfaces/IRegisterService";
import IRegisterCreateParams from "./interfaces/IRegisterCreateParams";
import store from "../model/store";
import { injectable } from "inversify";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";
import { setRegisterMessage, successRegister } from "../model/feature/auth";

@injectable()
export default class RegisterService implements IRegisterService {
  async createUser(params: IRegisterCreateParams): Promise<boolean> {
    const result = langApi.endpoints.postUsers.initiate({body: params});
    const sub = store.dispatch(result);
    return sub.then((response) => {
      if (this.isSuccessResponse(response)) {
        store.dispatch(successRegister());
        return true;
      } else {
        const message = 'data' in response.error ? response.error.data as string : 'message' in response.error ? response.error.message as string : 'Неизвестная ошибка';
        store.dispatch(setRegisterMessage(message));
        return false;
      }
    })
  }
  protected isSuccessResponse(response: {data: User} | {error: FetchBaseQueryError | SerializedError }): response is {data: User}
  {
    return (response as {data: User}).data !== undefined;
  }
}