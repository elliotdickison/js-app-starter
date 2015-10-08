/**
 * Renders the full html page given a redux store and router props. This is
 * used server side only.
 *
 * @module
 */

import React from 'react';
import App from '../components/app';

/**
 * Renders a full html page that includes doctype, html, head, and body tags as
 * well as the app itself
 *
 * @param {Object} The Redux store
 * @param {Object} Props to pass to ReactRouter
 *
 * @returns {String} The rendered html
 */
export default function renderHtml (store, routerProps) {
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
      <div id="root">${React.renderToString(<App store={store} routerProps={routerProps} />)}</div>
      <script>window.__INITIAL_STATE__ = ${JSON.stringify(store.getState())};</script>
      <script src="index.js"></script>
    </body>
    </html>`;
}