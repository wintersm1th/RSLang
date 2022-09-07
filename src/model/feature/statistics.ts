import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';
import { StatisticPayload } from "../api/shemas";

interface IStatistics {
  statistics: StatisticPayload
}

const initialState: IStatistics = {
  statistics: {
    daysWords: {},
    sprintGame: {
      learnedWordsCount: 0,
      totalWordsCount: 0,
      bestSession: 0
    },
    audioGame: {
      learnedWordsCount: 0,
      totalWordsCount: 0,
      bestSession: 0,
    },
  }
};

export const slice = createSlice({
  name: 'statistics',
  initialState,
  reducers: {
    setStatistics(state, { payload: statistics }: PayloadAction<StatisticPayload>) {
      state.statistics = statistics;
    },
  },
});

export const { setStatistics } = slice.actions;

export const selectState = (state: RootState): IStatistics => state[slice.name];
