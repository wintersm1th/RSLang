import IAuthParams from './IAuthParams';
import IUserInfo from './IUserInfo';

interface IAuthService {
  authorize(params: IAuthParams): Promise<boolean>;
  start(): void;
  logout(): void;
  getAuthParams(): IUserInfo | null;
}

export default IAuthService;
