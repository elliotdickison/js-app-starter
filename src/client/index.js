import 'babelify/polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import Router from 'react-router';
import routes from '../common/routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import configureStore from '../common/configure-store';

let history = createBrowserHistory();
let initialState = window.__INITIAL_STATE__;
let store = configureStore(initialState);
let rootElement = document.getElementById('root');

React.render(
    <Provider store={store}>
        {() => <Router history={history}>{routes}</Router>}
    </Provider>,
    rootElement
);