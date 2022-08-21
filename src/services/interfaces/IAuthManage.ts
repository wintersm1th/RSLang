interface IAuthManage {
  registerErrorMessage: string | null;
  authErrorMessage: string | null;
  isRegisterSuccess: boolean | null;
  isAuthSuccess: boolean | null;
}

export default IAuthManage;