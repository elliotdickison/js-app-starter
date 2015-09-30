import { compose, createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import widgets from '../modules/widgets';

let rootReducer = combineReducers({
    widgets
});

export default function configureStore (initialState, includeDevTools = false) {
  let middleware = [applyMiddleware(thunk)];

  if (includeDevTools) {
      let { devTools, persistState } = require('redux-devtools');
      middleware.push(devTools());
      middleware.push(persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)));
  }

  let createStoreWithMiddleware = compose.apply(null, middleware)(createStore);

  return createStoreWithMiddleware(rootReducer, initialState);
}