import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import Immutable from 'immutable';
import widgets from '../modules/widgets';

let rootReducer = combineReducers({
    widgets
});

let createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}