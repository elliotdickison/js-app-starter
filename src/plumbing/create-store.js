/**
 * Creates a redux store with the correct middleware for the current environment
 * (e.g. dev tooling middleware is included in development only). The store can
 * be seeded by passing in an initial state object (helpful for rehydrating a
 * server-rendered app on the client).
 * @module
 */

import { compose, createStore as createReduxStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import widgets from '../modules/widgets';

const rootReducer = combineReducers({
    widgets
});

function getMiddleware () {
  let middleware = [applyMiddleware(thunk)];
  if (__DEVELOPMENT__) {
    const { devTools, persistState } = require('redux-devtools');
    middleware.push(devTools());
    middleware.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  }
  return middleware;
}

export default function createStore (initialState) {
  const createStoreWithMiddleware = compose.apply(null, getMiddleware())(createReduxStore);
  return createStoreWithMiddleware(rootReducer, initialState);
}