import IAuthParams from './IAuthParams';

interface IAuthService {
  authorize: (params: IAuthParams) => Promise<boolean>;
  start: () => void;
  logout: () => void;
}

export default IAuthService;
