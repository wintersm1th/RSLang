import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../store';

type DictionaryInfoState = {
  group: number;
  pageNumber: number;
};

const initialState: DictionaryInfoState = {
  group: 0,
  pageNumber: 0,
};

const slice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setPage(state, { payload: pageNumber }: PayloadAction<number>) {
      state.pageNumber = pageNumber;
    },

    setGroup(state, { payload: difficulty }: PayloadAction<number>) {
      state.group = difficulty;
    },
  },
});

export const { setPage, setGroup } = slice.actions;

export const selectState = (state: RootState): DictionaryInfoState => state[slice.name];

export default slice;
