import { langApi, User } from "../generated/services/langApi";
import IRegisterService from "./interfaces/IRegisterService";
import IRegisterCreateParams from "./interfaces/IRegisterCreateParams";
import store from "../model/store";
import { injectable } from "inversify";
import { setRegisterMessage, successRegister } from "../model/feature/auth";
import { isKnownError, isSerializedError, isSuccessResponse } from "./utils/ErrorResposne";

@injectable()
export default class RegisterService implements IRegisterService {
  async createUser(params: IRegisterCreateParams): Promise<boolean> {
    const result = langApi.endpoints.postUsers.initiate({body: params});
    const sub = store.dispatch(result);
    return sub.then((response) => {
      if (isSuccessResponse<User>(response)) {
        store.dispatch(successRegister());
        return true;
      }

      let message: string = '';

      if (isSerializedError(response.error)) {
        message = response.error.message ?? 'Неизвестная ошибка';
      } else if (isKnownError(response.error)) {
        message = response.error.error;
      } else {
        message = 'Неизвестная ошибка';
      }

      store.dispatch(setRegisterMessage(message));
      return false;
    })
  }
}