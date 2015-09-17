import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import { reducers as widgets } from './modules/widgets';

const rootReducer = combineReducers({
    widgets,
});

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);

export default function configureStore (initialState) {
    return createStoreWithMiddleware(rootReducer, initialState);
}