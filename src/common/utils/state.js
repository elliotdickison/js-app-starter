import Immutable from 'immutable';

export function dehydrate (state) {
    return JSON.stringify(state);
}

export function hydrate (state) {
    let hydratedState = {};
    Object.getOwnPropertyNames(state).forEach( (prop) => {
        hydratedState[prop] = Immutable.fromJS(state[prop]);
    });
    return hydratedState;
}