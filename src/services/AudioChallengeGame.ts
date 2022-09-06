import { inject, injectable } from 'inversify';


import store from '../model/store';

import { userWords as userWordsApi } from '../model/api/private';

import {
  destroyGame,
  startFromStartScreen,
  setPage,
  setGroup,
  startGame,
  selectState as selectGameState,
  StartScreenStage,
  createIncompletedStep,
  IncompletedStep
} from '../model/feature/audiochallenge';

import DI_TYPES from '../DI/DITypes';
import IWordsService from './interfaces/IWordsService';
import IAuthService from './interfaces/IAuthService';
import { IStatisticsService } from './interfaces/IStatisticService';
import IAuth from '../core/IAuth';

import { IAudioChallengeGame, StartingParams } from './interfaces/IAudioChallengeGame';
import { AggregatedWord } from '../model/api/private/userWords';

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

  async startWithParams({ group, page }: StartingParams) {
    const steps = await this.createStepsForParams({ group, page });
    store.dispatch(startGame(steps));
  }

  startWithSettingsScreen(): void {
    console.log(this.statisticsService);
    console.log(this.wordsService);

    store.dispatch(startFromStartScreen({ difficulty: 0, page: 0 }));
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

  async startGame() {
    const { stage } =  selectGameState(store.getState());
    const { group, page } = stage as StartScreenStage;

    const steps = await this.createStepsForParams({ group, page });

    store.dispatch(startGame(steps));
  }

  destroy() {
    store.dispatch(destroyGame());
  }

  startForDifficulty(): void {}

  selectAnswerVariant(_wordId: string) {}

  async createStepsForParams({ group, page }: { group: number, page: number}): Promise<IncompletedStep[]> {
    const availableUnlearnedWordsThunk = userWordsApi.endpoints.getUnlearnedWordsForPage.initiate({
      userId: this.userParams.id,
      group,
      page
    });

    const availableAsVariantWordsThunk = userWordsApi.endpoints.getAggregatedWordsUpToPage.initiate({
      userId: this.userParams.id,
      group,
      page
    });

    const [
      { data: availableUnlearnedWords },
      { data: availableAsVariantWords }
    ] = await Promise.all([
      store.dispatch(availableUnlearnedWordsThunk),
      store.dispatch(availableAsVariantWordsThunk)
    ]);

    if (availableUnlearnedWords === undefined || availableAsVariantWords === undefined) {
      throw Error('Cant fetch words for game');
    }
    
    const answerWrods = pickWords(availableUnlearnedWords, 10);    

    const steps = answerWrods.map((answer) => {
      const answerId = answer.id;
      const variantValidator = (variant: AggregatedWord) => variant.id !== answerId;
      const variants: [string, string, string, string] = pickWordsWithValidation(availableAsVariantWords, 3, variantValidator)
        .map((variant) => variant.id)
        .concat(answerId) as [string, string, string, string];
      
      shuffle(variants);
      console.log(variants);

      return createIncompletedStep({
        answer: answerId,
        variants: variants
      });
    });

    return steps;
  }
}

function shuffle<T>(target: T[]): void {
  for (let i = 0; i < target.length; i++) {
    const randomPosition = Math.floor((Math.random() * target.length));
    [target[i], target[randomPosition]] = [target[randomPosition], target[i]];
  }  
}

function pickWords<T>(sourceWords: T[], count: number): T[] {
  if (count > sourceWords.length) {
    throw Error('Insufficient amount of source items');
  }

  const indicies = Array(sourceWords.length).fill(0).map((_, ind) => ind);
  shuffle(indicies);
  
  const result: T[] = [];

  for (let i = 0; i < count; i++) {
    result.push(sourceWords[indicies[i]]);
  }

  return result;
}

function pickWordsWithValidation<T>(sourceWords: T[], count: number, isValid: (word: T) => boolean): T[] {
  const indicies = Array(sourceWords.length).fill(0).map((_, ind) => ind);
  shuffle(indicies);
  
  let position = 0;
  let pickedCount = 0;

  const result: T[] = [];

  while (pickedCount < count && position < indicies.length) {
    const pickedItem = sourceWords[indicies[position]];
    if (isValid(pickedItem)) {
      result.push(pickedItem);
      pickedCount++;
    }

    position++;
  }

  if (pickedCount !== count) {
    throw Error('Insufficient amount of source items');
  }

  return result;
}