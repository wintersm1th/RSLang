import { inject, injectable } from 'inversify';


import store from '../model/store';

import { userWords as userWordsApi } from '../model/api/private';

import {
  destroyGame,
  startFromStartScreen,
  setPage,
  setGroup,
  //startGame,
  selectState as selectGameState,
  StartScreenStage
} from '../model/feature/audiochallenge';

import DI_TYPES from '../DI/DITypes';
import IWordsService from './interfaces/IWordsService';
import IAuthService from './interfaces/IAuthService';
import { IStatisticsService } from './interfaces/IStatisticService';
import IAuth from '../core/IAuth';

import { IAudioChallengeGame } from './interfaces/IAudioChallengeGame';

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

  async selectGroup(value: number) {
    store.dispatch(setGroup(value));
    const { stage } = selectGameState(store.getState());
    const { page, group } = stage as StartScreenStage;

    const thunk = userWordsApi.endpoints.getUnlearnedWordsForPage.initiate({
      userId: this.userParams.id,
      page, group
    });

    const sub = store.dispatch(thunk);

    sub.then((response) => {
      console.log(response?.data ?? []);
    })
  }

  selectPage(value: number) {
    store.dispatch(setPage(value));
  }

  startGame() {

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
