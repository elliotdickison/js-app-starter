/**
 * Provides utility functions for dealing with state.
 *
 * @module
 */

import Immutable from 'immutable';

/**
 * Dehydrates the state for portability (e.g. sending from server to client)
 *
 * @param {Object} An ImmutableJS object
 *
 * @returns {String} A stringified JSON representation of the state
 */
export function dehydrateState (state) {
    return JSON.stringify(state);
}

/**
 * Hydrates the state for use in the client-side application. Note that this
 * cannot be applied directly to the output of dehydrateState() as it's assumed
 * that the server will send the dehydrated state as a plain javascript object
 * in a script tag and not as a string (which would require an unnecessary JSON
 * parsing step).
 *
 * @param {Object} A plain object representing the state
 *
 * @returns {Object} An ImmutableJS object
 */
export function hydrateState (state) {
    return Immutable.fromJS(state);
}