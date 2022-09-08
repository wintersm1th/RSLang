import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { StatWordCard } from '../../components/statistics/StatWordCard';
import { StatGamesCard } from '../../components/statistics/StatGamesCard';
import { selectState as selectAuthParams } from '../../../model/feature/auth';
import { useSelector } from 'react-redux';
import { statistic as statApi } from '../../../model/api/private';
import { StatisticPayload } from "../../../model/api/shemas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


function getCorrectAnswerPercent(learnedWords: number, totalWords: number): number {
  if (!totalWords || !learnedWords) {
    return 0;
  }
  return Math.ceil(learnedWords * 100 / totalWords);
}

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

  console.log({totalLearned: totalLearned, totalWords: totalWords, totalPercent: getCorrectAnswerPercent(totalLearned, totalWords)});
  return {totalLearned: totalLearned, totalWords: totalWords, totalPercent: getCorrectAnswerPercent(totalLearned, totalWords)}
}

interface IWordDays {
  [p: string]: {
    learnedWordsCount: number,
    totalWordsCount: number,
    sprintGame: { learnedWordsCount: number, totalWordsCount: number, bestSession: number },
    audioGame: { learnedWordsCount: number, totalWordsCount: number, bestSession: number }
  }
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

  const todayStats = getDayStats(stats?.optional, currentDay);
  const daysWords = stats?.optional?.daysWords as IWordDays ?? {};
  const labels = Object.keys(daysWords);

  const data = {
    labels,
    datasets: [
      {
        label: 'Количество новых слов за каждый день',
        data: labels.map((day) => getDayStats(stats?.optional, day).totalLearned),
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Увеличение количества изученных слов за весь период обучения',
        data: labels.map((day) => getDayStats(stats?.optional, day).totalWords),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Два графика сумарной статистики по дням за все время',
      },
    },
  };

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
            <Bar options={options} data={data} />
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
