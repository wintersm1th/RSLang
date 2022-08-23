import * as React from 'react';
import { useSelector } from "react-redux";
import { RootState } from "../../model/store";
import userSlice from "../../model/feature/user";
import DIContainer from "../../DI/DIContainer";
import IAuthService from "../../services/interfaces/IAuthService";
import DI_TYPES from "../../DI/DITypes";
import { Logout } from "@mui/icons-material";
import Button from "@mui/material/Button";

const UserLink = () => {
  const authService = DIContainer.get<IAuthService>(DI_TYPES.AuthService);
  const handleClick = () => { authService.logout();} ;
  const userInfo = useSelector((state: RootState) => state[userSlice.name]);
  return (
    <div className="auth-link">
      { userInfo.name } <Button color="secondary" onClick={handleClick}><Logout /></Button>
    </div>
  );
};

export default UserLink;
