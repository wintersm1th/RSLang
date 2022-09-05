import { IAudioChallengeGame } from "./interfaces/IAudioChallengeGame";

import store from "../model/store";

import { startGame } from '../model/feature/audiochallenge';
import { inject } from "inversify";
import DI_TYPES from "../DI/DITypes";
import IWordsService from "./interfaces/IWordsService";
import IAuthService from "./interfaces/IAuthService";
import { IStatisticsService } from "./interfaces/IStatisticService";
import IAuth from "../core/IAuth";

export default class AudioChallengeGame implements IAudioChallengeGame {
  private userParams: IAuth;

  constructor(
    @inject(DI_TYPES.WordsService) private wordsService: IWordsService,
    @inject(DI_TYPES.AuthService) private authService: IAuthService,
    @inject(DI_TYPES.StatisticsService) private statisticsService: IStatisticsService
  ) {
    const auth = authService.getAuth();

    if (auth === null) {
      throw Error('Unauthorized');
    }

    this.userParams = auth;
  }

  startFromStartScreen(): void {
    this.wordsService
  }

  startForDifficulty(): void {
    
  }

  selectAnswerVariant(wordId: string) {
    
  }
}