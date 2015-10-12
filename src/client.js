/**
 * The client-side entry point for the entire application.
 *
 * @module
 */

import 'babel-core/polyfill';
import './styles/index.scss';
import React from 'react';
import ReactDom from 'react-dom';
import Immutable from 'immutable';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import createStore from './plumbing/create-store';
import App from './components/app';

let history = createBrowserHistory();
let store = createStore(Immutable.fromJS(window.__INITIAL_STATE__));
let rootElement = document.getElementById('root');

ReactDom.render(
  <App store={store} routerProps={{ history }} routes={routes} />,
  rootElement
);