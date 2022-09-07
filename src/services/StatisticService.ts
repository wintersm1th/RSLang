import { inject, injectable } from "inversify";
import { IStatisticsService } from './interfaces/IStatisticService';
import { statistic as statisticApi } from '../model/api/private';
import store from '../model/store';
import { Statistic, StatisticPayload } from "../model/api/shemas";
import { setStatistics } from "../model/feature/statistics";
import DI_TYPES from "../DI/DITypes";
import IAuthService from "./interfaces/IAuthService";
import IAuth from "../core/IAuth";

@injectable()
export default class StatisticService implements IStatisticsService {
  private userParams: IAuth;
  constructor(@inject(DI_TYPES.AuthService) authService: IAuthService) {
    const auth = authService.getAuth();
    if (auth === null) {
      throw Error('unauth');
    }

    this.userParams = auth;
  }

  async initializeStatistics(): Promise<boolean> {
    try {
      const { optional } = await this.getStatistics();
      store.dispatch(setStatistics(optional));
    } catch {
      const body: Statistic = {
        optional: {
          daysWords: {
            '11.08.1994' : {
              learnedWordsCount: 0,
                totalWordsCount: 0,
                sprintGame: {
                  learnedWordsCount: 0,
                  totalWordsCount: 0,
                  bestSession: 0,
                },
                audioGame: {
                  learnedWordsCount: 0,
                  totalWordsCount: 0,
                  bestSession: 0,
                },
            }
          },
          sprintGame: {
            learnedWordsCount: 0,
            totalWordsCount: 0,
            bestSession: 0,
          },
          audioGame: {
            learnedWordsCount: 0,
            totalWordsCount: 0,
            bestSession: 0,
          },
        }
      };
      console.log('new');
      console.log(body);
      this.updateStatistics(body);
    }

    return true;
  }

  async incrementLearnedWordsCount(): Promise<boolean> {
    return await this.IncrementforDay(1);
  }

  async decrementLearnedWordsCount(_userId: string): Promise<boolean> {
    return await this.IncrementforDay(-1);
  }

  async modifyDaySprintStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>
  {
    return await this.modifyGameStatistic('sprintGame', wordsCount, positiveCount, bestSeries);
  }

  async modifyDayAudioStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>
  {
    return await this.modifyGameStatistic('audioGame', wordsCount, positiveCount, bestSeries);
  }


  async IncrementforDay(numberCount: number): Promise<boolean> {
    const { optional } = await this.getStatistics();
    const currentDay = new Date().toLocaleDateString()
    const {
      daysWords: {
        [currentDay]: {
          learnedWordsCount, ...rest3
        },
        ...rest2
      },
      ...rest1
    } = optional;

    const updated: StatisticPayload = {
      daysWords: {
        [currentDay]: {
          learnedWordsCount: numberCount + learnedWordsCount, ...rest3
        },
        ...rest2
      },
      ...rest1
    };

    const updatedBody = {
      optional: updated
    };

    return this.updateStatistics(updatedBody);
  }



  private async modifyGameStatistic(gameKey: 'sprintGame' | 'audioGame', wordsCount: number, positiveCount: number, bestSeries: number)
  {
    const { optional } = await this.getStatistics();
    const currentDay = new Date().toLocaleDateString();
    const isSprint = (key: 'sprintGame' | 'audioGame'): key is 'sprintGame' => key === 'sprintGame';
    // const isAudio = (key: 'sprintGame' | 'audioGame'): key is 'audioGame' => key === 'audioGame';
    const key = isSprint(gameKey) ? 'sprintGame' : 'audioGame';

    const {
      daysWords: {
        [currentDay]: {
          [key]: oldStat,
          ...rest3
        },
        ...rest2
      },
      ...rest1
    } = optional;
    const { learnedWordsCount, totalWordsCount, bestSession: oldBestSeries } = oldStat;
    const updated: StatisticPayload = {
      daysWords: {
        [currentDay]: {
          [key]: {
            learnedWordsCount: learnedWordsCount + positiveCount,
            totalWordsCount: totalWordsCount + wordsCount,
            bestSession: Math.max(bestSeries, oldBestSeries)
          },
          ...rest3
        },
        ...rest2
      },
      ...rest1
    };

    const updatedBody = {
      optional: updated
    };

    return this.updateStatistics(updatedBody);
  }


  public async getStatistics(): Promise<Statistic> {
    const { data } = await store.dispatch(statisticApi.endpoints.getStatistic.initiate({ userId: this.userParams.id }));
    console.log(data);
    if (data === undefined) {
      console.log('error');
      throw Error('Undefined behavior');
    }

    const { optional } = data;
    const tempProps: StatisticPayload = JSON.parse(JSON.stringify(optional));
    return { optional: tempProps };
  }

  private async updateStatistics(newBody: Statistic): Promise<boolean> {
    const mutationThunk = statisticApi.endpoints.updateStatistic.initiate({
      userId: this.userParams.id,
      payload: newBody,
    });

    return store.dispatch(mutationThunk).then((response) => !('error' in response));
  }
}
