import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import IUserInfo from '../../services/interfaces/IUserInfo';
import { RootState } from '../store';

type UserInfoState = IUserInfo;

const initialState: UserInfoState = {
  name: '',
  userId: '',
  token: '',
  refreshToken: '',
};

const slice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserInfo(state, { payload }: PayloadAction<IUserInfo>) {
      state.name = payload.name;
      state.userId = payload.userId;
      state.token = payload.token;
      state.refreshToken = payload.refreshToken;
      localStorage.setItem('userInfo', JSON.stringify(payload));
    },

  },
});

export const selectUserInfo = (state: RootState): UserInfoState => state[slice.name];

export default slice;
export const { setUserInfo } = slice.actions;
