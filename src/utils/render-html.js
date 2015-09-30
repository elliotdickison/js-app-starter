import React from 'react';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';
import { dehydrateState } from './state';

export default function renderHtml (store, renderProps) {
  let styles = [];
  if (!__DEVELOPMENT__) {
    styles.push('<link rel="stylesheet" type="text/css" href="index.css" />');
  }
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>app-name</title>
      ${styles.join('')}
    </head>
    <body>
      <div id="root"><div>${
        React.renderToString(
          <Provider store={store}>
            {() => <RoutingContext {...renderProps}/>}
          </Provider>
        )
      }</div></div>
      <script>window.__INITIAL_STATE__ = ${dehydrateState(store.getState())};</script>
      <script src="index.js"></script>
    </body>
    </html>`;
}