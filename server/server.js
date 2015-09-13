import Express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import { Provider } from 'react-redux';

import createLocation from 'history/lib/createLocation';
import { RoutingContext, match } from 'react-router';
import routes from '../common/routes';

import configureStore from '../common/configure-store';
import { fetchAllWidgets } from '../common/api/widgets';

const app = new Express();
const port = 3000;

app.use(Express.static(path.join(__dirname, '../public')));

app.use( (req, res) => {
    const location = createLocation(req.url);
    match({ routes, location }, (error, redirectLocation, renderProps) => {
        if (redirectLocation) {
            res.redirect(301, redirectLocation.pathname + redirectLocation.search);
        } else if (error) {
            res.send(500, error.message);
        } else if (renderProps === null) {
            res.send(404, 'Not found');
        } else {
            fetchAllWidgets( (apiResult) => {
                const initialState = { widgets: apiResult || [] };
                const store = configureStore(initialState);
                const state = store.getState();
                const html = React.renderToString(
                    <Provider store={store}>
                        {() => <RoutingContext {...renderProps}/>}
                    </Provider>
                );
                res.send(renderPage(html, state));
            });
        }
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