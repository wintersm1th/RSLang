import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type DictionaryInfoState = {
  difficult: string;
  pageNumber: string;
};

const initialState: DictionaryInfoState = {
  difficult: '1',
  pageNumber: '0',
};

const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, { payload: pageNumber }: PayloadAction<string>) {
      state.pageNumber = pageNumber;
    },

    setDifficult(state, { payload: difficult }: PayloadAction<string>) {
      state.difficult = difficult;
    },
  },
});

export const { setPage, setDifficult } = slice.actions;

export const selectState = (state: RootState): DictionaryInfoState => state[slice.name];

export default slice;
