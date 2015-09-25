import Express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';

import configureStore from '../common/configure-store';

import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import routes from '../common/routes';
import {Provider} from 'react-redux';

// DEV ONLY - create a separate server.dev.js file....
import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

let port = process.env.PORT || 3000;

let app = new Express();

if (process.env.NODE_ENV === 'development') {
  var compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: '/',
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(Express.static('dist'));

app.use( (req, res) => {
  let store = configureStore();
  let location = createLocation(req.url);
  renderRoute(location, store)
    .then( (data) => {
      res.status(data.status)[data.method](data.value);
    })
    .catch( (error) => {
      console.log(error);
    });
});

app.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}. Open up http://localhost:${port}/ in your browser.`);
  }
});

function renderPage (html, state, head = '') {
  return fs
    .readFileSync(path.join(__dirname, '/index.html'))
    .toString()
    .replace('{{head}}', head)
    .replace('{{html}}', html)
    .replace('{{state}}', JSON.stringify(state));
}

function getFetchDataFromRoute (route) {
  return route.WrappedComponent ? getFetchDataFromRoute(route.WrappedComponent) : route.fetchData;
}

function getPromisesFromRoutes (routes, store) {
  return routes
    .filter( (route) => getFetchDataFromRoute(route) )
    .map(getFetchDataFromRoute)
    .map( (fetchData) => fetchData(store) );
}

function renderRoute (location, store) {
  return new Promise( (resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      } else if (renderProps === null) {
        resolve({
          status: 404,
          method: 'send',
          value: 'Yiss?',
        });
      } else if (redirectLocation) {
        resolve({
          status: 301,
          method: 'redirect',
          value: redirectLocation.pathname + redirectLocation.search,
        });
      } else {
        Promise
          .all(getPromisesFromRoutes(renderProps.components, store))
          .then( () => {
            let html = React.renderToString(
              <Provider store={store}>
                {() => <RoutingContext {...renderProps}/>}
              </Provider>
            );
            let head = process.env.NODE_ENV === 'development' ? '' : '<link rel="stylesheet" type="text/css" href="index.css" />';
            return resolve({
              status: 200,
              method: 'send',
              value: renderPage(html, store.getState(), head),
            });
          })
          .catch( (error) => {
            reject(error);
          });
      }
    });
  });
}