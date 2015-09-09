import 'babelify/polyfill';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../common/configure-store';
import App from '../common/app';

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState);
const rootElement = document.getElementById('root');

React.render(
    <Provider store={store}>
        {() => <App/>}
    </Provider>,
    rootElement
);