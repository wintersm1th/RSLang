import IAuthParams from './IAuthParams';

interface IAuthService {
  authorize: (params: IAuthParams) => Promise<boolean>;
  start: () => void;
}

export default IAuthService;
