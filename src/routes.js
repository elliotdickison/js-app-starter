/**
 * The application routes (handled on both the client and the server).
 * @module
 */

import React from 'react';
import { Route } from 'react-router';
import AppChrome from './components/app-chrome';
import Front from './components/front';
import Widgets from './components/widgets';

let routes = (
  <Route path="/" component={AppChrome}>
    <Route path="front" component={Front} />
    <Route path="widgets" component={Widgets} />
  </Route>
);

export default routes;