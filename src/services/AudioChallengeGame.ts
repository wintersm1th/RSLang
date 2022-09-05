import { IAudioChallengeGame } from './interfaces/IAudioChallengeGame';

import { destroyGame, startFromStartScreen, setPage, setDifficulty } from '../model/feature/audiochallenge';
import { inject, injectable } from 'inversify';
import DI_TYPES from '../DI/DITypes';
import IWordsService from './interfaces/IWordsService';
import IAuthService from './interfaces/IAuthService';
import { IStatisticsService } from './interfaces/IStatisticService';
import IAuth from '../core/IAuth';
import store from '../model/store';

@injectable()
export default class AudioChallengeGame implements IAudioChallengeGame {
  private userParams: IAuth;

  constructor(
    @inject(DI_TYPES.WordsService) private wordsService: IWordsService,
    @inject(DI_TYPES.AuthService) authService: IAuthService,
    @inject(DI_TYPES.StatisticsService) private statisticsService: IStatisticsService
  ) {
    const auth = authService.getAuth();

    if (auth === null) {
      throw Error('Unauthorized');
    }

    this.userParams = auth;
  }

  start() {
    this.startFromStartScreen();
  }

  selectGroup(value: number) {
    store.dispatch(setDifficulty(value));
  }

  selectPage(value: number) {
    store.dispatch(setPage(value));
  }

  destroy() {
    store.dispatch(destroyGame());
  }

  startFromStartScreen(): void {
    console.log(this.statisticsService);
    this.wordsService.getUnlearnedWordsForPage({
      group: 0,
      page: 0,
      userId: this.userParams.id,
    });
    store.dispatch(startFromStartScreen({ difficulty: 0, page: 0 }));
  }

  startForDifficulty(): void {}

  selectAnswerVariant(_wordId: string) {}
}
