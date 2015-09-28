import React, { Component } from 'react';
import Immutable from 'immutable';

export default class PureComponent extends Component {

  shouldComponentUpdate (nextProps, nextState) {
    return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
  }

}

function isSame(thingOne, thingTwo) {
  return thingOne === thingTwo || Immutable.is(thingOne, thingTwo);
}

function isArrayOrObject(thing) {
  return typeof thing === 'object' && thing !== null;
}

function shallowEqual(thingOne, thingTwo) {

  if (isSame(thingOne, thingTwo)) {
    return true;
  }

  if (!isArrayOrObject(thingOne) || !isArrayOrObject(thingTwo)) {
    return false;
  }

  const thingOneKeys = Object.keys(thingOne);
  const thingTwoKeys = Object.keys(thingTwo);

  if (thingOneKeys.length !== thingTwoKeys.length) {
    return false;
  }

  for (let key of thingOneKeys) {
    if (!thingTwo.hasOwnProperty(key) || !isSame(thingOne[key], thingTwo[key])) {
      return false;
    }
  }

  return true;
}