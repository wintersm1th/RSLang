import React from 'react';
import { Box, Container, Typography } from '@mui/material';
import { StatWordCard } from '../../components/statistics/StatWordCard';
import { StatGamesCard } from '../../components/statistics/StatGamesCard';

const Statistics = () => {
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
            <StatWordCard value={0} title="новых слов"></StatWordCard>
            <StatWordCard value={0} title="изученных слов"></StatWordCard>
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

export default Statistics;
