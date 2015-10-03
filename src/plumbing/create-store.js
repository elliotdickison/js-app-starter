/**
 * Creates a redux store with the correct middleware for the current environment
 * (e.g. dev tooling middleware is included in development only). The store can
 * be seeded by passing in an initial state object (helpful for rehydrating a
 * server-rendered app on the client).
 * @module
 */

import { compose, createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import widgets from '../modules/widgets';

const emptyState = Map();
const emptyAction = {};

function applyReducers (reducers, state = emptyState, action = emptyAction) {
  return Map(Object.keys(reducers).reduce((result, key) => {
    result[key] = reducers[key](state.get(key), action);
    return result;
  }, {}));
}

function combineImmutableReducers (reducers) {
  var defaultState = applyReducers(reducers);
  return function combination (state = defaultState, action = emptyAction) {
    return applyReducers(reducers, state, action);
  }
}

function getMiddleware () {
  let middleware = [applyMiddleware(thunk)];
  if (__DEVELOPMENT__ && __CLIENT__) {
    const { devTools, persistState } = require('redux-devtools');
    middleware.push(devTools());
    middleware.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  }
  return middleware;
}

export default function createStore (initialState) {
  const rootReducer = combineImmutableReducers({
    widgets
  });
  const createStoreWithMiddleware = compose.apply(null, getMiddleware())(createReduxStore);
  return createStoreWithMiddleware(rootReducer, initialState);
}