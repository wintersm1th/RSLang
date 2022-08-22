import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IUserInfo from "../../services/interfaces/IUserInfo";

const initialState : IUserInfo = {
  name: '',
  userId: '',
  token: '',
  refreshToken: ''
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

    resetUserInfo(state, _: PayloadAction<void>) {
      state.name = '';
      state.userId = '';
      state.token = '';
      state.refreshToken = '';
      localStorage.removeItem('userInfo');
    }
  }
});

export default slice;
export const {
  setUserInfo,
  resetUserInfo
} = slice.actions