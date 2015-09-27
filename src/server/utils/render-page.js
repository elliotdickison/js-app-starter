import fs from 'fs';
import path from 'path';
import React from 'react';
import { Provider } from 'react-redux';
import { RoutingContext } from 'react-router';
import { dehydrate as dehydrateState } from '../../common/utils/state';

function renderHtml (store, renderProps) {
  return React.renderToString(
    <Provider store={store}>
      {() => <RoutingContext {...renderProps}/>}
    </Provider>
  );
}

function renderHead () {
  return process.env.NODE_ENV !== 'hot' ? '<link rel="stylesheet" type="text/css" href="index.css" />' : '';
}

export default function renderPage (store, renderProps) {
  return fs
    .readFileSync(path.join(__dirname, '/../index.html'))
    .toString()
    .replace('{{head}}', renderHead())
    .replace('{{html}}', renderHtml(store, renderProps))
    .replace('{{state}}', dehydrateState(store.getState()));
}