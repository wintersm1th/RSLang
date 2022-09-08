import React from 'react';

import { FC } from 'react';
import GameType from '../../../core/GameType';

import
  Statistics,
  {
    DailyStatistics,
    GlobalGameStatistics
} from '../../../core/Statistics';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DAILY_STATS_KEEPING_MARKER } from '../../../services/StatisticService';

const nameOfGame = (game: GameType): string => {
  switch (game) {
    case GameType.AudioChallenge:
      return 'Аудиовызов';
    case GameType.Sprint:
      return 'Спринт';
  }
}

export type GlobalGameStatisticsProps = {
  game: GameType;
  statistics: { [k: string]: DailyStatistics };
}

const GlobalGameStatistics : FC<GlobalGameStatisticsProps> = ({ game, statistics }) => {
  const gameStats = Object.entries(statistics)
    .filter(([day]) => day !== DAILY_STATS_KEEPING_MARKER)
    .map(([_day, stats]) => stats[game]);

  const learnedWordsCount = gameStats.reduce((acc, stats) => acc + stats.learnedWordsCount, 0);
  const totalWordsCount = gameStats.reduce((acc, stats) => acc + stats.totalWordsCount, 0);
  const bestSeries = gameStats.reduce((acc, stats) => Math.max(acc, stats.bestSession), 0);

  return (
    <Box>
      <Typography variant="h4">Статистика по игре "{nameOfGame(game)}"</Typography>
      <Typography variant='body1'>Изучено слов: {learnedWordsCount}</Typography>
      <Typography variant='body1'>Всего слов просмотрено: {totalWordsCount}</Typography>
      <Typography variant='body1'>Лучшая серия: {bestSeries}</Typography>
    </Box>
  );
}

export default GlobalGameStatistics;