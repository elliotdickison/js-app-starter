import React from 'react';
import { dehydrateState } from './state';
import renderApp from './render-app';

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
      <div id="root">${renderApp(store, renderProps)}</div>
      <script>window.__INITIAL_STATE__ = ${dehydrateState(store.getState())};</script>
      <script src="index.js"></script>
    </body>
    </html>`;
}