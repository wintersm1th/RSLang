import React, { FC } from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export interface StatGamesCardProps {
  gameTitle: string;
  valueWords: number;
  valuePercents: number;
  valueSeries: number;
}

export const StatGamesCard: FC<StatGamesCardProps> = ({ gameTitle, valueWords, valuePercents, valueSeries }) => {
  return (
    <Card sx={{ minWidth: 400, margin: 2 }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography margin={2} variant="h5" sx={{ textAlign: 'center' }}>
          {gameTitle}
        </Typography>
        <Typography mb={1} variant="body1">
          Количество новых слов: {valueWords}
        </Typography>
        <Typography mb={1} variant="body1">
          Процент правильных слов: {valuePercents}
        </Typography>
        <Typography variant="body1">Самая длинная серия правильных ответов: {valueSeries}</Typography>
      </CardContent>
    </Card>
  );
};
