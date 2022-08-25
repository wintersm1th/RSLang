import { injectable } from 'inversify';
import { langApi, User } from '../generated/services/langApi';
import { slice as registrationFormSlice } from '../model/feature/forms/registration';
import store from '../model/store';

import IRegisterService, { CreateUserParams } from './interfaces/IRegisterationService';

import {
  isCustomError,
  isFetchError,
  isParsingError,
  isSerializedError,
  isSuccessResponse,
  isUnknownError,
} from './utils/ErrorResponse';

@injectable()
export default class RegisterService implements IRegisterService {
  async createUser(params: CreateUserParams): Promise<boolean> {
    const result = langApi.endpoints.postUsers.initiate({ body: params });
    const sub = store.dispatch(result);

    return sub.then((response) => {
      if (isSuccessResponse<User>(response)) {
        const { success } = registrationFormSlice.actions;
        store.dispatch(success('Вы успешно зарегестрировались'));

        return true;
      }

      const { error } = response;

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

      const { fail } = registrationFormSlice.actions;
      store.dispatch(fail(message));

      return false;
    });
  }
}
