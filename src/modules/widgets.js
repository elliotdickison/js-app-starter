/**
 * A redux "duck" (see https://github.com/erikras/ducks-modular-redux). This
 * contains the default values for state.widgets, all action creators that
 * target state.widgets, and a reducer function that can apply each action to
 * state.widgets. ImmutableJS is used to ensure that the state is not
 * accidentally mutated.
 *
 * @module
 */

import Immutable, { Map, List } from 'immutable';

const LOAD_REQUESTED = 'widgets/load-requested';
const LOAD_SUCCEEDED = 'widgets/load-succeeded';
const LOAD_FAILED = 'widgets/load-failed';
const WIDGET_BUILT = 'widgets/widget-build';
const WIDGET_DESTROYED = 'widgets/widget-destroyed';

let initialState = new Map({
  loaded: false,
  loading: false,
  data: List(),
  error: null,
});

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {

    case LOAD_REQUESTED:
      return state.set('loading', true);

    case LOAD_SUCCEEDED:
      return state.merge({
        loading: false,
        loaded: true,
        data: action.payload,
        error: null,
      });

    case LOAD_FAILED:
      return state.merge({
        loading: false,
        loaded: false,
        error: action.error,
      });

    case WIDGET_BUILT:
      return state.set('data', state.get('data').push(Immutable.fromJS(action.payload)));

    case WIDGET_DESTROYED:
      return state.set('data', state.get('data').delete(action.payload));

    default:
      return state;
  }
}

export function loadRequested () {
  return {
    type: LOAD_REQUESTED,
  };
}

export function loadSucceeded (data) {
  return {
    type: LOAD_SUCCEEDED,
    payload: data,
  };
}

export function loadFailed (error) {
  return {
    type: LOAD_FAILED,
    error: error,
  }
}

export function widgetBuilt (data) {
  return {
    type: WIDGET_BUILT,
    payload: data
  };
}

export function widgetDestroyed (index) {
  return {
    type: WIDGET_DESTROYED,
    payload: index
  };
}

export function loadWidgets () {
  return (dispatch) => {
    dispatch(loadRequested());
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
          resolve([{ name: 'one' }, { name: 'two' }]);
        }, 500);
      })
      .then( (data) => {
        dispatch(loadSucceeded(data));
      })
      .catch( (error) => {
        dispatch(loadFailed(error));
      });
  };
}

export function buildWidget (data) {
  return (dispatch) => {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
          resolve(data);
        }, 500);
      })
      .then( (data) => {
        dispatch(widgetBuilt(data));
      });
  };
}