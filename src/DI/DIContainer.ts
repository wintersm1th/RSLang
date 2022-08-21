import 'reflect-metadata';
import { Container } from 'inversify';

import DI_TYPES from './DITypes';

import IApp from '../IApp';
import App from '../App';
import IRegisterService from "../services/interfaces/IRegisterService";
import RegisterService from "../services/RegisterService";
import IAuthService from "../services/interfaces/IAuthService";
import AuthService from "../services/AuthService";

const DIContainer = new Container();

DIContainer.bind<IApp>(DI_TYPES.App).to(App).inSingletonScope();
DIContainer.bind<IRegisterService>(DI_TYPES.RegisterService).to(RegisterService).inSingletonScope();
DIContainer.bind<IAuthService>(DI_TYPES.AuthService).to(AuthService).inSingletonScope();

export default DIContainer;
