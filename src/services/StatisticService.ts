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
      await this.getStatistics();
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

  async incrementLearnedWordsForDay(): Promise<boolean> {
    const { optional } = await this.getStatistics();
    const currentDay = new Date().toLocaleDateString()
    if (currentDay in optional.daysWords) {
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
            learnedWordsCount: 1 + learnedWordsCount, ...rest3
          },
          ...rest2
        },
        ...rest1
      };
      const updatedBody = {
        optional: updated
      };

      return this.updateStatistics(updatedBody);
    } else {
      const {
        daysWords,
        ...rest1
      } = optional;

      const updated: StatisticPayload = {
        daysWords: {
          [currentDay]: {
            learnedWordsCount: 1,
            audioGame: { learnedWordsCount: 0, totalWordsCount: 0, bestSession: 0 },
            sprintGame: { learnedWordsCount: 0, totalWordsCount: 0, bestSession: 0 },
            totalWordsCount: 0,
          },
          ...daysWords
        },
        ...rest1
      };
      const updatedBody = {
        optional: updated
      };

      return this.updateStatistics(updatedBody);
    }
  }

  async modifyDaySprintStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>
  {
    return await this.modifyGameStatistic('sprintGame', wordsCount, positiveCount, bestSeries);
  }

  async modifyDayAudioStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>
  {
    return await this.modifyGameStatistic('audioGame', wordsCount, positiveCount, bestSeries);
  }

  private async modifyGameStatistic(gameKey: 'sprintGame' | 'audioGame', wordsCount: number, positiveCount: number, bestSeries: number)
  {
    const { optional } = await this.getStatistics();
    const currentDay = new Date().toLocaleDateString();
    const isSprint = (value: 'sprintGame' | 'audioGame'): value is 'sprintGame' => value === 'sprintGame';
    const {
      daysWords: dailyStats,
      ...rest1
    } = optional;

    if (currentDay in dailyStats) {
      console.log('Update for day');

      const {
        [currentDay]: {
          sprintGame: oldSprintStats,
          audioGame: oldAudioStats,
          ...dayRestStat
        },
        ...daysRest
      } = dailyStats;

      const { learnedWordsCount, totalWordsCount, bestSession: oldBestSeries } =
        isSprint(gameKey) ? oldSprintStats : oldAudioStats;

      console.log('Actual values', learnedWordsCount, totalWordsCount, oldBestSeries)

      const updatedBody = {
        daysWords: {
          [currentDay]: {
            ...(isSprint(gameKey)
            ? {
              sprintGame: {
                learnedWordsCount: learnedWordsCount + positiveCount,
                totalWordsCount: totalWordsCount + wordsCount,
                bestSession: Math.max(bestSeries, oldBestSeries)
              },
              audioGame: oldAudioStats
            } : {
              audioGame: {
                learnedWordsCount: learnedWordsCount + positiveCount,
                totalWordsCount: totalWordsCount + wordsCount,
                bestSession: Math.max(bestSeries, oldBestSeries)
              },
              sprintGame: oldSprintStats
            }),
            ...dayRestStat
          },
          ...daysRest
        },
        ...rest1
      };
      console.log('updated body', updatedBody)
      return this.updateStatistics({ optional: updatedBody });
    } else {
      const updatedBody = {
        daysWords: {
          [currentDay]: {

          ...(isSprint(gameKey)
            ? {
              sprintGame: {
                learnedWordsCount: positiveCount,
                totalWordsCount: wordsCount,
                bestSession: bestSeries
              },
              audioGame: { learnedWordsCount: 0, totalWordsCount: 0, bestSession: 0 }
            } : {
              audioGame: {
                learnedWordsCount: positiveCount,
                totalWordsCount: wordsCount,
                bestSession: bestSeries
              },
              sprintGame: { learnedWordsCount: 0, totalWordsCount: 0, bestSession: 0 }
            }),
            learnedWordsCount: 0,
            totalWordsCount: 0
          },
          ...dailyStats
        },
        ...rest1
      }

      return this.updateStatistics({ optional: updatedBody });
    }
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

    store.dispatch(setStatistics(newBody.optional));

    return store.dispatch(mutationThunk).then((response) => !('error' in response));
  }
}
