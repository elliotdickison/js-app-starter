/**
 * The server-side entry point for the entire application.
 *
 * @module
 */

import Express from 'express';
import createStore from './plumbing/create-store';
import configureHmr from './plumbing/configure-hmr';
import createLocation from 'history/lib/createLocation';
import { match } from 'react-router';
import routes from './routes';
import { fetchDataForComponents } from './plumbing/require-data';
import renderHtml from './plumbing/render-html';
import { buildAppConfigIntoGlobals } from './plumbing/build-app-config';

buildAppConfigIntoGlobals({ client: false });

let port = process.env.PORT || 3000;

let app = new Express();

if (__DEVELOPMENT__) {
  configureHmr(app);
}

// Set "dist" as the public folder from which static assets are accessible
app.use(Express.static('dist'));

// Catch all other requests and handle them with ReactRouter
app.use( (req, res) => {
  let store = createStore();
  let location = createLocation(req.url);
  handleRoute(location, store)
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

/**
 * Match the requested route, fetch data for it, and render the final html
 *
 * @param {Object} The current location (obtained via history/createLocation)
 * @param {Object} The Redux store
 *
 * @returns {Object} A promise that may reject with an error message or resolve
 * to an object containing a status code, method (e.g. send or redirect), and a
 * value (e.g. the response body or the redirect location)
 */
function handleRoute (location, store) {
  return new Promise( (resolve, reject) => {
    match({ routes, location }, (error, redirectLocation, renderProps) => {
      if (error) {
        reject(error);
      } else if (!renderProps) {
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
        fetchDataForComponents(renderProps.components, store)
          .then( () => {
            return resolve({
              status: 200,
              method: 'send',
              value: renderHtml(store, renderProps),
            });
          })
          .catch( (error) => {
            reject(error);
          });
      }
    });
  });
}