import { inject, injectable } from 'inversify';

import DI_TYPES from '../DI/DITypes';

import store from '../model/store';
import { userWords } from '../model/api/private';

import IWordsService, { UserWordParameters } from './interfaces/IWordsService';
import IAuthService from './interfaces/IAuthService';
import { WordDifficulty } from '../core/WordDifficulty';

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
      return this.createUserWord({ id: userId, wordId, difficulty: WordDifficulty.HARD });
    }

    if (word.isLearned === true) {
      return false;
    }

    return this.unsafeUpdateWord({ id: authParams.id, wordId, difficulty: WordDifficulty.HARD });
  }

  async setWordLearnedMark(wordId: string): Promise<boolean> {
    const authParams = this.authService.getAuth();

    if (authParams === null) {
      return false;
    }

    const word = await this.getUserWord(wordId);

    if (word === null) {
      return this.createUserWord({ id: authParams.id, wordId, difficulty: WordDifficulty.LEARNED });
    }

    return this.unsafeUpdateWord({ id: authParams.id, wordId, difficulty: WordDifficulty.LEARNED });
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

    return this.unsafeUpdateWord({ id: authParams.id, wordId, difficulty: WordDifficulty.NONE });
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

    return this.unsafeUpdateWord({ id: authParams.id, wordId, difficulty: WordDifficulty.NONE });
  }

  private async unsafeUpdateWord({ id, wordId, difficulty }: { id: string; wordId: string, difficulty: WordDifficulty }) {
    const wordUpdateThunk = userWords.endpoints.updateUserWord.initiate({
      id,
      wordId,
      difficulty
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
    { id, wordId, difficulty }: { id: string; wordId: string, difficulty: WordDifficulty }
  ) {
    const createUserWordThunk = userWords.endpoints.createUserWord.initiate({
      id,
      wordId,
      difficulty,
    });

    return store.dispatch(createUserWordThunk).then((response) => {
      return !('error' in response);
    });
  }
}
