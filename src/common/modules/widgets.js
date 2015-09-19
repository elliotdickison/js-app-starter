const REQUEST_LOAD = 'REQUEST_LOAD_WIDGETS';
const LOAD_SUCCESS = 'LOAD_WIDGETS_SUCCESS';
const LOAD_FAIL = 'LOAD_WIDGETS_FAIL';
const BUILD = 'BUILD_WIDGET';
const DESTROY = 'DESTROY_WIDGET';

let initialState = {
  loaded: false,
  loading: false,
  data: [],
  error: null,
};

export function reducers (state = initialState, action = undefined) {
  switch (action.type) {

    case REQUEST_LOAD:
      return Object.assign({}, state, {
        loading: true,
      });

    case LOAD_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        data: action.payload,
        error: null,
      });

    case LOAD_FAIL:
      return Object.assign({}, state, {
        loading: false,
        loaded: false,
        error: action.error,
      });

    case BUILD:
      return Object.assign({}, state, {
        data: [].concat(state.data, action.payload),
      });

    case DESTROY:
      return Object.assign({}, state, {
        data: state.data.filter( (widget, index) => {
          return index !== action.payload;
        }),
      });

    default:
      return state;
  }
}

export let actions = {

  requestLoad () {
    return {
      type: REQUEST_LOAD,
    };
  },

  loadSuccess (data) {
    return {
      type: LOAD_SUCCESS,
      payload: data,
    };
  },

  loadFail (error) {
    return {
      type: LOAD_FAIL,
      error: error,
    }
  },

  build (data) {
    return {
      type: BUILD,
      payload: data
    };
  },

  destroy (index) {
    return {
      type: DESTROY,
      payload: index
    };
  },

};

actions.load = () => {
  return (dispatch) => {
    dispatch(actions.requestLoad());
    return fetchAllWidgets()
      .then( (data) => {
        dispatch(actions.loadSuccess(data));
      })
      .catch( (error) => {
        dispatch(actions.loadFail(error));
      });
  };
};

actions.asyncBuild = (data) => {
  return (dispatch) => {
    return buildWidget(data)
      .then( (data) => {
        dispatch(actions.build(data));
      });
  };
};


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