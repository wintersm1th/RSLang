import { configureStore, createSlice } from '@reduxjs/toolkit';

interface DummyState {
  message: string;
}

const initialState: DummyState = {
  message: 'Hello world',
};

const dummySlice = createSlice({
  name: 'dummySubstate',
  initialState,
  reducers: {},
});

const store = configureStore({
  reducer: dummySlice.reducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
