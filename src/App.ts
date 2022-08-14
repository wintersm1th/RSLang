import React from 'react';
import ReactDOM from 'react-dom/client';
import { injectable } from 'inversify';

import IApp from './IApp';

import AppView from './view/App';

@injectable()
export default class App implements IApp {
  private reactRoot: ReactDOM.Root | null = null;

  run(root: HTMLDivElement) {
    this.reactRoot = ReactDOM.createRoot(root);
    this.render();
  }

  private render() {
    this.reactRoot?.render(React.createElement(AppView, {}, null));
  }
}
