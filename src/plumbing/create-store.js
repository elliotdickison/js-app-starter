import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
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
  const createStoreWithMiddleware = compose.apply(null, getMiddleware())(createStore);
  return createStoreWithMiddleware(rootReducer, initialState);
}