/**
 * Creates a redux store with the correct middleware for the current environment
 * (e.g. dev tooling middleware is included in development only). Implements a
 * custom reducer combination technique that allows the application state to be
 * an ImmutableJS object instead of a plain javascript object.
 *
 * @module
 */

import { compose, createStore as createReduxStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Map } from 'immutable';
import widgets from '../modules/widgets';

const emptyState = Map();
const emptyAction = {};

/**
 * Applys an action to the state using a group of reducers
 *
 * @param {Object} An object of reducers keyed to the same state keys that the
 * reducers apply to
 * @param {Object} [state=emptyState] The current ImmutableJS state object
 * @param {Object} [action=emptyAction] The action to apply to the state
 *
 * @returns {Function} A mega-reducer that can be used to easily apply all the
 * individual reducers
 */
function applyReducers (reducers, state = emptyState, action = emptyAction) {
  return Map(Object.keys(reducers).reduce((result, key) => {
    result[key] = reducers[key](state.get(key), action);
    return result;
  }, {}));
}

/**
 * Takes a group of reducers and combines them into a single reducer
 *
 * @param {Object} An object of reducers keyed to the state keys that the
 * reducers apply to
 *
 * @returns {Function} A mega-reducer that can be used to easily run all of the
 * individual reducers
 */
function combineImmutableReducers (reducers) {
  var defaultState = applyReducers(reducers);
  return function combination (state = defaultState, action = emptyAction) {
    return applyReducers(reducers, state, action);
  }
}

/**
 * Builds and returns an array of middleware to be applied to the Redux store
 *
 * @returns {Function[]} An array of middleware
 */
function getMiddleware () {
  let middleware = [applyMiddleware(thunk)];
  if (__DEVELOPMENT__ && __CLIENT__) {
    const { devTools, persistState } = require('redux-devtools');
    middleware.push(devTools());
    middleware.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  }
  return middleware;
}

/**
 * Builds and returns a Redux store instance
 *
 * @param {Object} [initialState] An ImmutableJS state object to seed the store
 *
 * @returns {Object} A Redux store
 */
export default function createStore (initialState) {
  const rootReducer = combineImmutableReducers({
    widgets
  });
  const createStoreWithMiddleware = compose.apply(null, getMiddleware())(createReduxStore);
  return createStoreWithMiddleware(rootReducer, initialState);
}