import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { StatWordCard } from '../../components/statistics/StatWordCard';
import { StatGamesCard } from '../../components/statistics/StatGamesCard';
import { selectState as selectAuthParams } from '../../../model/feature/auth';
import { useSelector } from 'react-redux';
import { statistic as statApi } from '../../../model/api/private';
import { StatisticPayload } from "../../../model/api/shemas";


function getCorrectAnswerPercent(learnedWords: number, totalWords: number): number {
  if (!totalWords || !learnedWords) {
    return 0;
  }
  return Math.ceil(learnedWords * 100 / totalWords);
}

// function getTotalStats(stats: StatisticPayload) {
//   let totalLearned = 0;
//   let totalWords = 0;
//   Object.keys(stats.daysWords).forEach(function(key) {
//     const currentDay = stats.daysWords[key];
//     const audioGame = currentDay['audioGame'];
//     const sprintGame = currentDay['sprintGame'];
//     totalLearned = audioGame.learnedWordsCount + sprintGame.learnedWordsCount + currentDay.learnedWordsCount;
//     totalWords = audioGame.totalWordsCount + sprintGame.totalWordsCount + currentDay.totalWordsCount;;
//   });
//
//   return {totalLearned: totalLearned, totalWords: totalWords, totalPercent: getCorrectAnswerPercent(totalLearned, totalWords)}
// }

function getDayStats(stats: StatisticPayload | undefined, day: string) {
  if (!stats) {
    return {totalLearned: 0, totalWords: 0, totalPercent: 0}
  }
  let totalLearned = 0;
  let totalWords = 0;
  const currentDay = stats.daysWords[day];
  const audioGame = currentDay['audioGame'];
  const sprintGame = currentDay['sprintGame'];
  totalLearned = audioGame.learnedWordsCount + sprintGame.learnedWordsCount + currentDay.learnedWordsCount;
  totalWords = audioGame.totalWordsCount + sprintGame.totalWordsCount + currentDay.totalWordsCount;
  return {totalLearned: totalLearned, totalWords: totalWords, totalPercent: getCorrectAnswerPercent(totalLearned, totalWords)}
}

const Statistics = ({ userId }: {userId: string} ) => {
  const { data: stats } = statApi.useGetStatisticQuery({userId});
  const currentDay = new Date().toLocaleDateString();
  let currentDayStats = {
    learnedWordsCount: 0,
    audioGame: { learnedWordsCount: 0, totalWordsCount: 0, bestSession: 0 },
    sprintGame: { learnedWordsCount: 0, totalWordsCount: 0, bestSession: 0 },
    totalWordsCount: 0
  };

  if (stats) {
    currentDayStats = (currentDay in stats.optional.daysWords) ? stats.optional.daysWords[currentDay] : currentDayStats;
  }

  //const totalStats = getTotalStats(stats.optional); // если доберешься до графиков
  const todayStats = getDayStats(stats?.optional, currentDay);

  return (
    <Container className="container-stat">
      <Box className="stat-wrapper">
        { stats &&
        <>
          <Box className="stat-for-day" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography margin="30px auto" variant="h4">
              Статистика за сегодня
            </Typography>

              <Typography margin="10px auto 5px" variant="h5">
                Слова
              </Typography>
              <Box className="stat-word" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <StatWordCard value={todayStats.totalWords} title="новых слов"/>
                <StatWordCard value={todayStats.totalLearned} title="изученных слов"/>
                <StatWordCard value={todayStats.totalPercent} title="% правильных ответов"/>
              </Box>

              <Typography margin="10px auto 5px" variant="h5">
                Мини-игры
              </Typography>
              <Box className="stat-games" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <StatGamesCard gameTitle="Аудиовызов"
                               valueWords={currentDayStats.audioGame.totalWordsCount}
                               valuePercents={getCorrectAnswerPercent(currentDayStats.audioGame.learnedWordsCount, currentDayStats.audioGame.totalWordsCount)}
                               valueSeries={currentDayStats.audioGame.bestSession}/>
                <StatGamesCard gameTitle="Спринт"
                               valueWords={currentDayStats.sprintGame.totalWordsCount}
                               valuePercents={getCorrectAnswerPercent(currentDayStats.sprintGame.learnedWordsCount, currentDayStats.sprintGame.totalWordsCount)}
                               valueSeries={currentDayStats.sprintGame.bestSession}/>
              </Box>

          </Box>

          <Box className="stat-all-time" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography margin="30px auto" variant="h4">
            Статистика за все время
          </Typography>
          <Box>
            <Typography margin="30px auto" variant="h5">
              Количество новых слов за каждый день
            </Typography>
          </Box>
          <Box>
            <Typography margin="30px auto" variant="h5">
              Увеличение количества изученных слов за весь период обучения
            </Typography>
          </Box>
        </Box>
        </>}
      </Box>
    </Container>
  );
};

const StatisticsWrapper = () => {
  const { user } = useSelector(selectAuthParams);

  const isPageForbidden = user === null;



  return (
    <>
      {isPageForbidden ? (
        <Typography>Вы должны быть авторизированы для просмотра этой страницы</Typography>
      ) : (
        <Statistics userId={user.id}/>
      )}
    </>
  );
};

export default StatisticsWrapper;
