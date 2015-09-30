import 'babel-core/polyfill';
import './styles/index.scss';
import React from 'react';
import { Provider } from 'react-redux';
import Router from 'react-router';
import { hydrateState } from './utils/state';
import routes from './routes';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import configureStore from './utils/configure-store';

let history = createBrowserHistory();
let initialState = hydrateState(window.__INITIAL_STATE__);
let store = configureStore(initialState, __DEVELOPMENT__);
let rootElement = document.getElementById('root');

let devTools = null;
if (__DEVELOPMENT__) {
  let { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
  devTools = (
    <DebugPanel top right bottom key="debugPanel">
      <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
  );
}

React.render(
  <div>
    <Provider store={store}>
      {() => <Router history={history}>{routes}</Router>}
    </Provider>
    {devTools}
  </div>,
  rootElement
);