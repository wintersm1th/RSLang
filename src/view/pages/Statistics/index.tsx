import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { StatWordCard } from '../../components/statistics/StatWordCard';
import { StatGamesCard } from '../../components/statistics/StatGamesCard';

import { selectState as selectAuth } from '../../../model/feature/auth';
import { useSelector } from 'react-redux';
import DIContainer from "../../../DI/DIContainer";
import DI_TYPES from "../../../DI/DITypes";
import { IStatisticsService } from "../../../services/interfaces/IStatisticService";

const Statistics = () => {
  const statisticService = DIContainer.get<IStatisticsService>(DI_TYPES.StatisticsService);
  const totalLearnedWords = statisticService.getTotalNewWords() ?? 0;
  const totalNewWords = statisticService.getTotalNewWords() ?? 0;

  return (
    <Container className="container-stat">
      <Box className="stat-wrapper">
        <Box className="stat-for-day" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography margin="30px auto" variant="h4">
            Статистика за сегодня
          </Typography>
          <Typography margin="10px auto 5px" variant="h5">
            Слова
          </Typography>
          <Box className="stat-word" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <StatWordCard value={totalNewWords} title="новых слов"></StatWordCard>
            <StatWordCard value={totalLearnedWords} title="изученных слов"></StatWordCard>
            <StatWordCard value={0} title="% правильных ответов"></StatWordCard>
          </Box>
          <Typography margin="10px auto 5px" variant="h5">
            Мини-игры
          </Typography>
          <Box className="stat-games" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <StatGamesCard gameTitle="Аудиовызов" valueWords={0} valuePercents={0} valueSeries={0}></StatGamesCard>
            <StatGamesCard gameTitle="Спринт" valueWords={0} valuePercents={0} valueSeries={0}></StatGamesCard>
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
      </Box>
    </Container>
  );
};

const StatisticsWrapper = () => {
  const { user } = useSelector(selectAuth);

  const isPageForbidden = user === null;

  return (
    <>
      {isPageForbidden ? (
        <Typography>Вы должны быть авторизированы для просмотра этой страницы</Typography>
      ) : (
        <Statistics />
      )}
    </>
  );
};

export default StatisticsWrapper;
