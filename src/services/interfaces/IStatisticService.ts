export interface IStatisticsService {
  initializeStatistics(userId: string): Promise<boolean>;

  incrementLearnedWordsCount(userId: string): Promise<boolean>;

  decrementLearnedWordsCount(userId: string): Promise<boolean>;
}