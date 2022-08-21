import IRegisterCreateParams from "./IRegisterCreateParams";

interface IRegisterService {
  createUser: (params: IRegisterCreateParams) => Promise<boolean>
}

export default IRegisterService;