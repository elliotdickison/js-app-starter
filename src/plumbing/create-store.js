/**
 * Creates a redux store with the correct enhancers for the current environment
 * (e.g. dev tools when building for development). Implements custom reducer
 * combining that allows the application state to be an ImmutableJS object
 * instead of the plain javascript object that Redux expects by default.
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
function combineReducers (reducers) {
  var defaultState = applyReducers(reducers);
  return function combination (state = defaultState, action = emptyAction) {
    return applyReducers(reducers, state, action);
  }
}

/**
 * Builds and returns an array of store enhancers to be applied to the main
 * Redux store
 *
 * @returns {Function[]} An array of Redux store enhancers
 */
function getStoreEnhancers () {
  let storeEnhancers = [applyMiddleware(thunk)];
  if (__DEVELOPMENT__ && __CLIENT__) {
    const { devTools, persistState } = require('redux-devtools');
    storeEnhancers.push(devTools());
    storeEnhancers.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  }
  return storeEnhancers;
}

/**
 * Builds and returns a Redux store instance
 *
 * @param {Object} [initialState] An ImmutableJS state object to seed the store
 *
 * @returns {Object} A Redux store
 */
export default function createStore (initialState) {
  const rootReducer = combineReducers({
    widgets
  });
  const createStoreWithEnhancers = compose.apply(null, getStoreEnhancers())(createReduxStore);
  return createStoreWithEnhancers(rootReducer, initialState);
}