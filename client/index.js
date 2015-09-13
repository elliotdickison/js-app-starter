import 'babelify/polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import Router from 'react-router';
import routes from '../common/routes';

import configureStore from '../common/configure-store';
import Widgets from '../common/containers/widgets';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

React.render(
    <Provider store={store}>
        {() => <Router>{routes}</Router>}
    </Provider>,
    rootElement
);