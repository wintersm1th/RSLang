import { inject, injectable } from "inversify";

import DI_TYPES from "../DI/DITypes";

import store from '../model/store';
import { api } from '../model/service/api';

import IWordsService, { UserWordParameters } from "./interfaces/IWordsService";
import IAuthService from "./interfaces/IAuthService";

@injectable()
export default class WordsService implements IWordsService {
  constructor(@inject(DI_TYPES.AuthService) private authService: IAuthService) { }

  async addWord(wordId: string, payload: UserWordParameters): Promise<boolean> {
    const authParams = this.authService.getAuthParams();
    
    if (authParams === null) {
      return false;
    }
    const { id: userId } = authParams;
    const createUserWordThnk = api.endpoints.createUserWord.initiate({
      id: userId,
      wordId: wordId,
      difficulty: 'alwaysempty',
      payload: {
        isDifficult: payload.isDifficult,
        isFavorite: payload.isFavorite
      }
    });

    store.dispatch(createUserWordThnk);

    return true;
  }


  async markWordAsFavorite(wordId: string) {
    const authParams = this.authService.getAuthParams();

    if (authParams === null) {
      return;
    }
    const { id: userId } = authParams;

    const getUserWordThunk = api.endpoints.readUserWord.initiate({ id: userId, wordId });

    const userWordSub = store.dispatch(getUserWordThunk);

    const { data } = await userWordSub;

    if (data === undefined) {
      this.addWord(wordId, { isDifficult: true, isFavorite: false });
    } else {
      
    }
  }

  markWordAsDifficult() {
    
  }
}