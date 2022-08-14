import 'reflect-metadata';
import { Container } from 'inversify';

import DI_TYPES from './DITypes';

import IApp from '../IApp';
import App from '../App';

const DIContainer = new Container();

DIContainer.bind<IApp>(DI_TYPES.App).to(App).inSingletonScope();

export default DIContainer;
