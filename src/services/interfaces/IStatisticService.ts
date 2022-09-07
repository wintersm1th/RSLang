import { Statistic } from "../../model/api/shemas";

export interface IStatisticsService {
  initializeStatistics(): Promise<boolean>;
  incrementLearnedWordsCount(): Promise<boolean>;
  decrementLearnedWordsCount(userId: string): Promise<boolean>;
  getStatistics(userId: string): Promise<Statistic>;
  incrementTotalWordsCount(): Promise<boolean>;
  decrementTotalWordsCount(): Promise<boolean>;
  modifyDaySprintStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>;
  modifyDayAudioStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>;
  modifyTotalSprintStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>
  modifyTotalAudioStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>
}
