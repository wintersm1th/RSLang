import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type DictionaryInfoState = {
  difficult: number;
  pageNumber: number;
};

const initialState: DictionaryInfoState = {
  difficult: 1,
  pageNumber: 0,
};

const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, { payload: pageNumber }: PayloadAction<number>) {
      state.pageNumber = pageNumber;
    },

    setDifficult(state, { payload: difficult }: PayloadAction<number>) {
      state.difficult = difficult;
    },
  },
});

export const { setPage, setDifficult } = slice.actions;

export const selectState = (state: RootState): DictionaryInfoState => state[slice.name];

export default slice;
