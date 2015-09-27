import Immutable, { Map, List } from 'immutable';

const REQUEST_LOAD = 'widgets/request-load';
const LOAD_SUCCESS = 'widgets/success';
const LOAD_FAIL = 'widgets/load-fail';
const BUILD = 'widgets/build';
const DESTROY = 'widgets/destroy';

let initialState = Map({
  loaded: false,
  loading: false,
  data: List(),
  error: null,
});

export default function (state = initialState, action = {}) {
  switch (action.type) {

    case REQUEST_LOAD:
      return state.set('loading', true);

    case LOAD_SUCCESS:
      return state.merge({
        loading: false,
        loaded: true,
        data: action.payload,
        error: null,
      });

    case LOAD_FAIL:
      return state.merge({
        loading: false,
        loaded: false,
        error: action.error,
      });

    case BUILD:
      return state.set('data', state.get('data').push(Immutable.fromJS(action.payload)));

    case DESTROY:
      return state.set('data', state.get('data').delete(action.payload));

    default:
      return state;
  }
}

export function requestLoad () {
  return {
    type: REQUEST_LOAD,
  };
}

export function loadSuccess (data) {
  return {
    type: LOAD_SUCCESS,
    payload: data,
  };
}

export function loadFail (error) {
  return {
    type: LOAD_FAIL,
    error: error,
  }
}

export function load () {
  return (dispatch) => {
    dispatch(requestLoad());
    return fetchAllWidgets()
      .then( (data) => {
        dispatch(loadSuccess(data));
      })
      .catch( (error) => {
        dispatch(loadFail(error));
      });
  };
}

export function build (data) {
  return {
    type: BUILD,
    payload: data
  };
}

export function asyncBuild (data) {
  return (dispatch) => {
    return buildWidget(data)
      .then( (data) => {
        dispatch(build(data));
      });
  };
}

export function destroy (index) {
  return {
    type: DESTROY,
    payload: index
  };
}

function fetchAllWidgets () {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve([{ name: 'one' }, { name: 'two' }]);
    }, 500);
  });
}

function buildWidget (data) {
  return new Promise( (resolve, reject) => {
    setTimeout( () => {
      resolve(data);
    }, 500);
  });
}