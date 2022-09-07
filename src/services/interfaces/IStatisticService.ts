import { Statistic } from "../../model/api/shemas";

export interface IStatisticsService {
  initializeStatistics(): Promise<boolean>;
  incrementLearnedWordsCount(): Promise<boolean>;
  decrementLearnedWordsCount(userId: string): Promise<boolean>;
  getStatistics(userId: string): Promise<Statistic>;
}
