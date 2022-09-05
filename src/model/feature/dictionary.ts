import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type DictionaryInfoState = {
  difficulty: number;
  pageNumber: number;
  difficultyFilter: boolean;
};

const initialState: DictionaryInfoState = {
  difficulty: 0,
  pageNumber: 0,
  difficultyFilter: false,
};

const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, { payload: pageNumber }: PayloadAction<number>) {
      state.pageNumber = pageNumber;
    },

    setDifficulty(state, { payload: difficulty }: PayloadAction<number>) {
      state.difficulty = difficulty;
    },
  },
});

export const { setPage, setDifficulty } = slice.actions;

export const selectState = (state: RootState): DictionaryInfoState => state[slice.name];

export default slice;
