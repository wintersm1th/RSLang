import { injectable } from 'inversify';
import { IStatisticsService } from './interfaces/IStatisticService';
import { statistic as statisticApi } from '../model/api/private';
import store from '../model/store';
import { Statistic } from '../model/api/shemas';

@injectable()
export default class StatisticService implements IStatisticsService {
  async initializeStatistics(userId: string): Promise<boolean> {
    try {
      await this.getStatistics(userId);
    } catch {
      const body: Statistic = {
        optional: {
          daysWords: {},
          sprintGame: {
            learnedWordsCount: 0,
            newWordsCount: 0,
            bestSession: 0,
          },
          audioGame: {
            learnedWordsCount: 0,
            newWordsCount: 0,
            bestSession: 0,
          },
        }
      };
      await this.updateStatistics(userId, body);
    }

    return true;
  }

  async incrementLearnedWordsCount(userId: string): Promise<boolean> {
    const { optional } = await this.getStatistics(userId);

    const currentDay = new Date().toLocaleDateString()
    if (currentDay in optional.daysWords) {
      optional.daysWords[currentDay]['learnedWordsCount']++
    } else {
      optional.daysWords[currentDay]['learnedWordsCount'] = 0
    }

    const updatedBody = {
      optional,
    };

    return this.updateStatistics(userId, updatedBody);
  }

  async decrementLearnedWordsCount(userId: string): Promise<boolean> {
    const { optional } = await this.getStatistics(userId);

    const currentDay = new Date().toLocaleDateString()
    if (currentDay in optional.daysWords) {
      optional.daysWords[currentDay]['learnedWordsCount']--
    } else {
      optional.daysWords[currentDay]['learnedWordsCount'] = 0
    }

    const updatedBody = {
      optional,
    };

    return this.updateStatistics(userId, updatedBody);
  }

  getTotalNewWords(): number
  {
    return 0;
  }

  getTotalLearnedWords(): number
  {
    return 0;
  }

  public async getStatistics(userId: string): Promise<Statistic> {
    const { data } = await store.dispatch(statisticApi.endpoints.getStatistic.initiate({ userId }));

    if (data === undefined) {
      throw Error('Undefined behavior');
    }

    const { optional } = data;

    return { optional };
  }

  private async updateStatistics(userId: string, newBody: Statistic): Promise<boolean> {
    const mutationThunk = statisticApi.endpoints.updateStatistic.initiate({
      userId,
      payload: newBody,
    });

    return store.dispatch(mutationThunk).then((response) => !('error' in response));
  }
}
