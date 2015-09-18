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

    load () {
        return (dispatch) => {
            dispatch({
                type: REQUEST_LOAD,
            });
            return fetchAllWidgets()
                .then( (payload) => {
                    dispatch({
                        type: LOAD_SUCCESS,
                        payload,
                    });
                })
                .catch( (error) => {
                    dispatch({
                        type: LOAD_FAIL,
                        error,
                    });
                });
        };
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

    asyncBuild (data) {
        return (dispatch) => {
            return buildWidget(data)
                .then( (payload) => {
                    dispatch({
                        type: BUILD,
                        payload,
                    });
                });
        };
    },

};

function fetchAllWidgets () {
    return new Promise( (resolve, reject) => {
        setTimeout( () => {
            resolve([{ name: "one" }, { name: "two" }]);
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