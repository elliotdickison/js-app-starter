import React from 'react';
import { Route } from 'react-router';
import App from './app';
import Front from './containers/front';
import Widgets from './containers/widgets';

let routes = (
  <Route path="/" component={App}>
    <Route path="front" component={Front} />
    <Route path="widgets" component={Widgets} />
  </Route>
);

export default routes;