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
      const body: Statistic = { learnedWords: 0 };
      this.updateStatistics(userId, body);
    }

    return true;
  }

  async incrementLearnedWordsCount(userId: string): Promise<boolean> {
    const { learnedWords, ...rest } = await this.getStatistics(userId);
    const updatedBody = {
      learnedWords: learnedWords + 1,
      ...rest,
    };

    return this.updateStatistics(userId, updatedBody);
  }

  async decrementLearnedWordsCount(userId: string): Promise<boolean> {
    const { learnedWords, ...rest } = await this.getStatistics(userId);
    const updatedBody = {
      learnedWords: learnedWords - 1,
      ...rest,
    };

    return this.updateStatistics(userId, updatedBody);
  }

  private async getStatistics(userId: string): Promise<Statistic> {
    const { data } = await store.dispatch(statisticApi.endpoints.getStatistic.initiate({ userId }));

    if (data === undefined) {
      throw Error('Undefined behavior');
    }

    const { learnedWords, optional } = data;

    return { learnedWords, optional };
  }

  private async updateStatistics(userId: string, newBody: Statistic): Promise<boolean> {
    const mutationThunk = statisticApi.endpoints.updateStatistic.initiate({
      userId,
      payload: newBody,
    });

    return store.dispatch(mutationThunk).then((response) => !('error' in response));
  }
}
