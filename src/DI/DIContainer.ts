import 'reflect-metadata';
import { Container } from 'inversify';

import DI_TYPES from './DITypes';

import IApp from '../IApp';
import App from '../App';
import IRegisterService from '../services/interfaces/IRegisterationService';
import RegisterService from '../services/RegistrationService';
import IAuthService from '../services/interfaces/IAuthService';
import AuthService from '../services/AuthService';
import IWordsService from '../services/interfaces/IWordsService';
import WordsService from '../services/WordsService';
import IDictionaryService from "../services/interfaces/IDictionaryService";
import DictionaryService from "../services/DictionaryService";

const DIContainer = new Container();

DIContainer.bind<IApp>(DI_TYPES.App).to(App).inSingletonScope();
DIContainer.bind<IRegisterService>(DI_TYPES.RegistrationService).to(RegisterService).inSingletonScope();
DIContainer.bind<IAuthService>(DI_TYPES.AuthService).to(AuthService).inSingletonScope();
DIContainer.bind<IWordsService>(DI_TYPES.WordsService).to(WordsService).inSingletonScope();
DIContainer.bind<IDictionaryService>(DI_TYPES.DictionaryService).to(DictionaryService).inSingletonScope();

export default DIContainer;
