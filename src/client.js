import 'babel-core/polyfill';
import './styles/index.scss';
import React from 'react';
import { hydrateState } from './plumbing/state';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './plumbing/configure-store';
import renderApp from './plumbing/render-app';

let history = createBrowserHistory();
let initialState = hydrateState(window.__INITIAL_STATE__);
let store = configureStore(initialState);
let rootElement = document.getElementById('root');

React.render(
  renderApp(store, { history }, routes),
  rootElement
);