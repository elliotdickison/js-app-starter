import React from 'react';
import { Provider } from 'react-redux';
import Router, { RoutingContext } from 'react-router';

function renderRouter (props, routes = null) {
  return routes ? <Router {...props}>{routes}</Router> : <RoutingContext {...props}/>;
}

function renderDevTools (store) {
  let devTools = null;
  if (__DEVELOPMENT__) {
    const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
    devTools = (
      <DebugPanel top right bottom key="debugPanel">
        <DevTools store={store} monitor={LogMonitor}/>
      </DebugPanel>
    );
  }
  return devTools;
}

export default function renderApp (store, routerProps, routes = null) {
  return (
    <div>
      <Provider store={store}>
        {() => renderRouter(routerProps, routes)}
      </Provider>
      {renderDevTools(store)}
    </div>
  );
}