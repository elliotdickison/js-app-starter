import Express from 'express';
import configureStore from './utils/configure-store';
import configureHmr from './utils/configure-hmr';
import createLocation from 'history/lib/createLocation';
import { match } from 'react-router';
import routes from './routes';
import { fetchDataForRoutes } from './utils/connect-route-data';
import renderHtml from './utils/render-html';

global.__DEVELOPMENT__ = process.env.NODE_ENV === 'development';

let port = process.env.PORT || 3000;

let app = new Express();

if (__DEVELOPMENT__) {
  configureHmr(app);
}

app.use(Express.static('dist'));

app.use( (req, res) => {
  let store = configureStore();
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

function handleRoute (location, store) {
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
        fetchDataForRoutes(renderProps.components, store)
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