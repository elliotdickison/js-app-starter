export const BUILD_WIDGET = 'BUILD_WIDGET';
export const DESTROY_WIDGET = 'DESTROY_WIDGET';

export function build (data) {
    return {
        type: BUILD_WIDGET,
        payload: data
    };
}

export function destroy (index) {
    return {
        type: DESTROY_WIDGET,
        payload: index
    };
}

export function asyncBuild(data, delay = 1000) {
    return dispatch => {
        setTimeout(() => {
            dispatch(build(data));
        }, delay);
    };
}