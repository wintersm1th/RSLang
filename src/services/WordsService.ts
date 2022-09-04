import { inject, injectable } from 'inversify';

import DI_TYPES from '../DI/DITypes';

import store from '../model/store';
import { userWords } from '../model/api/private';

import IWordsService, { UserWordParameters } from './interfaces/IWordsService';
import IAuthService from './interfaces/IAuthService';

@injectable()
export default class WordsService implements IWordsService {
  constructor(@inject(DI_TYPES.AuthService) private authService: IAuthService) {}

  async setWordDifficultMark(wordId: string): Promise<boolean> {
    const authParams = this.authService.getAuth();

    if (authParams === null) {
      return false;
    }

    const { id: userId } = authParams;
    const word = await this.getUserWord(wordId);

    if (word === null) {
      return this.createUserWord({ id: userId, wordId }, { isDifficult: true, isLearned: false });
    }

    if (word.isLearned === true) {
      return false;
    }

    return this.unsafeUpdateWord({ id: authParams.id, wordId }, { ...word, isDifficult: true });
  }

  async setWordLearnedMark(wordId: string): Promise<boolean> {
    const authParams = this.authService.getAuth();

    if (authParams === null) {
      return false;
    }

    const word = await this.getUserWord(wordId);

    if (word === null) {
      return this.createUserWord({ id: authParams.id, wordId }, { isDifficult: false, isLearned: true });
    }

    return this.unsafeUpdateWord({ id: authParams.id, wordId }, { ...word, isLearned: true, isDifficult: false });
  }

  async removeWordDifficultMark(wordId: string): Promise<boolean> {
    const authParams = this.authService.getAuth();

    if (authParams === null) {
      return false;
    }

    const word = await this.getUserWord(wordId);

    if (word === null) {
      throw Error('Undefined behavior');
    }

    return this.unsafeUpdateWord({ id: authParams.id, wordId }, { ...word, isLearned: true });
  }

  async removeWordLearnedMark(wordId: string): Promise<boolean> {
    const authParams = this.authService.getAuth();

    if (authParams === null) {
      return false;
    }

    const word = await this.getUserWord(wordId);

    if (word === null) {
      throw Error('Undefined behavior');
    }

    return this.unsafeUpdateWord({ id: authParams.id, wordId }, { ...word, isLearned: true });
  }

  private async unsafeUpdateWord({ id, wordId }: { id: string; wordId: string }, payload: UserWordParameters) {
    const wordUpdateThunk = userWords.endpoints.updateUserWord.initiate({
      id,
      wordId,
      difficulty: 'blank',
      optional: payload,
    });

    return store.dispatch(wordUpdateThunk).then((response) => {
      return !('error' in response);
    });
  }

  private async getUserWord(wordId: string): Promise<UserWordParameters | null> {
    const authParams = this.authService.getAuth();

    if (!authParams) {
      return null;
    }

    const { id: userId } = authParams;

    const getUserWordThunk = userWords.endpoints.readUserWord.initiate({ id: userId, wordId });
    const getUserWordSub = store.dispatch(getUserWordThunk);

    try {
      const { data } = await getUserWordSub;
      return data?.optional ?? null;
    } catch {
      return null;
    }
  }

  private async createUserWord(
    { id, wordId }: { id: string; wordId: string },
    { isDifficult, isLearned: isFavorite }: UserWordParameters
  ) {
    const createUserWordThunk = userWords.endpoints.createUserWord.initiate({
      id,
      wordId,
      difficulty: 'blank',
      payload: {
        isDifficult,
        isLearned: isFavorite,
      },
    });

    return store.dispatch(createUserWordThunk).then((response) => {
      return !('error' in response);
    });
  }
}
