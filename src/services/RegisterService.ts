import { injectable } from "inversify";
import { langApi, User } from "../generated/services/langApi";
import { setRegisterMessage, successRegister } from "../model/feature/auth";
import store from "../model/store";
import IRegisterCreateParams from "./interfaces/IRegisterCreateParams";
import IRegisterService from "./interfaces/IRegisterService";
import { isCustomError, isFetchError, isParsingError, isSerializedError, isSuccessResponse, isUnknownError } from "./utils/ErrorResposne";

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

      const { error  } = response;

      let message: string = '';

      if (isSerializedError(error)) {
        message = error.message ?? 'Неизвестная ошибка';
      } else if (isUnknownError(error)) {
        message = 'Неизвестная ошибка';
      } else if (isParsingError(error)) {
        message = error.data ?? 'Неизвестная ошибка'
      } else if (isFetchError(error) || isCustomError(error)) {
        message = error.error;
      } else {
        throw Error('Undefined behavior');
      }

      store.dispatch(setRegisterMessage(message));

      return false;
    })
  }
}
