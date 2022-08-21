import { langApi } from "../generated/services/langApi";
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
    return sub.then((data) => {
      if ('error' in data) {
        const errResponse = data as {error: FetchBaseQueryError | SerializedError};
        const message = 'data' in errResponse.error ? errResponse.error.data : 'message' in errResponse.error ? errResponse.error.message : 'Неизвестная ошибка';
        store.dispatch(setRegisterMessage(message as string));
        return false;
      } else {
        store.dispatch(successRegister());
        return true;
      }
    })
  }
}