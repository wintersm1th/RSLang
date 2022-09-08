import { Statistic } from "../../model/api/shemas";

export interface IStatisticsService {
  initializeStatistics(): Promise<boolean>;
  getStatistics(userId: string): Promise<Statistic>;

  modifyDaySprintStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>;
  modifyDayAudioStatistic(wordsCount: number, positiveCount: number, bestSeries: number): Promise<boolean>;

  incrementLearnedWordsForDay(): Promise<boolean>; // Всегда увеличиваем количество изученных слов в дне на +1
}
