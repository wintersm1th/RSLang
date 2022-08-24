import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUserInfo from '../../services/interfaces/IUserInfo';
import { RootState } from '../store';

type UserInfoState = {
  user: IUserInfo | null;
};

const initialState: UserInfoState = {
  user: null  
};

const slice = createSlice({
  name: 'userAuthParams',
  initialState,
  reducers: {
    setUserInfo(state, { payload: { name, id, token, refreshToken } }: PayloadAction<IUserInfo>) {
      state.user = { name, id, token, refreshToken };
    },
    clearUserInfo(state) {
      state.user = null;
    }
  },
});

export const selectState = (state: RootState): UserInfoState => state[slice.name];

export default slice;
export const {
  setUserInfo,
  clearUserInfo
} = slice.actions;
