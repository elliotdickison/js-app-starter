import Express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';

import configureStore from '../common/configure-store';

import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import routes from '../common/routes';
import {Provider} from 'react-redux';

const app = new Express();
const port = 3000;

app.use(Express.static(path.join(__dirname, '../../public')));

app.use( (req, res) => {
    const store = configureStore();
    const location = createLocation(req.url);
    renderRoute(location, store)
        .then( (data) => {
            res.send(renderPage(data.html, data.state));
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

function renderPage (html, state) {
    return fs
        .readFileSync(path.join(__dirname, '/index.html'))
        .toString()
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
                return reject(error);
            }
            Promise
                .all(getPromisesFromRoutes(renderProps.components, store))
                .then( () => {
                    const html = React.renderToString(
                        <Provider store={store}>
                            {() => <RoutingContext {...renderProps}/>}
                        </Provider>
                    );
                    return resolve({
                        html,
                        state: store.getState(),
                    });
                })
                .catch( (error) => {
                    reject(error);
                });
        });
    });
}