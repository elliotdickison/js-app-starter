import React from 'react';
import { Route } from 'react-router';
import App from './components/app';
import Front from './components/front';
import Widgets from './components/widgets';

let routes = (
  <Route path="/" component={App}>
    <Route path="front" component={Front} />
    <Route path="widgets" component={Widgets} />
  </Route>
);

export default routes;