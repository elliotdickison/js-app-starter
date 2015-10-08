/**
 * Main application component. Takes a redux store, router props, and optionally
 * a set of routes as props. If routes are provided it is assumed that no
 * routing has occurred yet and the current route will be evaluated client-side.
 * If no routes are provided it is assumed that routing has already occurred
 * (server-side) and that the router props contain all the necessary information
 * needed to render the current route.
 *
 * @module
 */

import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import Router, { RoutingContext } from 'react-router';

class App extends Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
    routerProps: PropTypes.object.isRequired,
    routes: PropTypes.object,
  }

  render () {

    let devTools = null;
    if (__DEVELOPMENT__ && __CLIENT__) {
      const { DevTools, DebugPanel, LogMonitor } = require('redux-devtools/lib/react');
      devTools = (
        <DebugPanel top right bottom key="debugPanel">
          <DevTools store={this.props.store} monitor={LogMonitor} visibleOnLoad={false} />
        </DebugPanel>
      );
    }

    return (
      <div>
        <Provider store={this.props.store}>
          {() => {
            let router = null;
            if (this.props.routes) {
              router = <Router {...this.props.routerProps}>{this.props.routes}</Router>;
            } else {
              router = <RoutingContext {...this.props.routerProps}/>;
            }
            return router;
          }}
        </Provider>
        {devTools}
      </div>
    );
  }
}

export default App;