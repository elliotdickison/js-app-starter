/**
 * Provides a generator for pure render functions that can be assigned to
 * React's shouldComponentUpdate
 *
 * @module
 */

import Immutable from 'immutable';

/**
 * Determines if two things are identical using either === or Immutable.is()
 *
 * @param {Mixed} The first thing to compare
 * @param {Mixed} The second thing to compare
 *
 * @returns {Boolean} Are the things identical?
 */
function isIdentical (thingOne, thingTwo) {
  return thingOne === thingTwo || Immutable.is(thingOne, thingTwo);
}

/**
 * Determines if something is an array or object
 *
 * @param {Mixed} The thing to check
 *
 * @returns {Boolean} Is the thing an array or object?
 */
function isArrayOrObject (thing) {
  return typeof thing === 'object' && thing !== null;
}

/**
 * Determines if two things are equal by first checking if they're identical and
 * then by falling back to a breadth-first comparison up to the specified depth
 * (assuming the things are both arrays or objects).
 *
 * @param {Mixed} The first thing to compare
 * @param {Mixed} The second thing to compare
 * @param {Number} The maximum depth that should be traversed when comparing
 * arrays or objects
 *
 * @returns {Boolean} Are the two things shallow-ly equal?
 */
function isEqual (thingOne, thingTwo, depth) {

  if (isIdentical(thingOne, thingTwo)) {
    return true;
  }

  // Quit unless we have two arrays or objects to compare and we haven't reached
  // the maximum allowable comparison depth.
  if (depth <= 0 || !isArrayOrObject(thingOne) || !isArrayOrObject(thingTwo)) {
    return false;
  }

  const thingOneKeys = Object.keys(thingOne);
  const thingTwoKeys = Object.keys(thingTwo);

  if (thingOneKeys.length !== thingTwoKeys.length) {
    return false;
  }

  for (let key of thingOneKeys) {
    if (!thingTwo.hasOwnProperty(key) || !isEqual(thingOne[key], thingTwo[key], depth - 1)) {
      return false;
    }
  }

  return true;
}

/**
 * Generates a function that can be used to determines if a pure component
 * should update based on props and state changes.
 *
 * @param {Number} [equalityDepth=1] The depth of the equality check to be used.
 * Defaults to a depth of 1, resulting in a shallow but performant equality
 * check.
 *
 * @returns {Function} shouldComponentUpdate-style equality check
 */
export default function getPureRenderFunction (equalityDepth = 1) {
  return function (nextProps, nextState) {
    return !isEqual(this.props, nextProps, equalityDepth) || !isEqual(this.state, nextState, equalityDepth);
  };
}