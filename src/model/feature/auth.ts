import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IAuthManage from "../../services/interfaces/IAuthManage";

const initialState : IAuthManage = {
  registerErrorMessage : null,
  authErrorMessage: null,
  isRegisterSuccess: null,
  isAuthSuccess: null,
};

const slice = createSlice({
  name: 'errorResponseSlice',
  initialState,
  reducers: {
    setRegisterMessage(state, { payload }: PayloadAction<string>) {
      state.registerErrorMessage = payload;
    },
    setAuthMessage(state, { payload }: PayloadAction<string>) {
      state.authErrorMessage = payload;
    },
    clearMessage(state, _: PayloadAction<void>) {
      state.registerErrorMessage = null;
      state.authErrorMessage = null;
      state.isRegisterSuccess = null;
      state.isAuthSuccess = null;
    },
    successAuth(state) {
      state.authErrorMessage = null;
      state.isAuthSuccess = true;
    },
    successRegister(state) {
      state.registerErrorMessage = null;
      state.isRegisterSuccess = true;
    }
  }
});

export default slice;
export const {
  setRegisterMessage,
  setAuthMessage,
  clearMessage,
  successAuth,
  successRegister,
} = slice.actions