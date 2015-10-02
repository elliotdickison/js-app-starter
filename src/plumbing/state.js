/**
 * Provides utility functions for dealing with state.
 * @module
 */

import Immutable from 'immutable';

export function dehydrateState (state) {
    return JSON.stringify(state);
}

export function hydrateState (state) {
    let hydratedState = {};
    Object.getOwnPropertyNames(state).forEach( (prop) => {
        hydratedState[prop] = Immutable.fromJS(state[prop]);
    });
    return hydratedState;
}