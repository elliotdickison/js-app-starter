import Express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import { Provider } from 'react-redux';

import configureStore from '../common/configure-store';
import App from '../common/app';
import { fetchAllWidgets } from '../common/api/widgets';

const app = new Express();
const port = 3000;

app.use(Express.static(path.join(__dirname, '../public')));

app.use( (req, res) => {
    fetchAllWidgets( (apiResult) => {
        const initialState = { widgets: apiResult || [] };
        const store = configureStore(initialState);

        const html = React.renderToString(
            <Provider store={store}>
                { () => <App/> }
            </Provider>
        );
        const state = store.getState();

        res.send(renderPage(html, state));
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