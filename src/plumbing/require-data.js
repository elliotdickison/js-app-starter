/**
 * Provides utilites that allow a component to easily declare an automatically
 * handled dependency on asynchronously fetched data. Sorta like a poor man's
 * Relay, except not at all.
 * @module
 */

import React, { Component, PropTypes } from 'react';

function getFetchDataFromComponent (component) {
  return component.WrappedComponent ? getFetchDataFromComponent(component.WrappedComponent) : component.fetchData;
}

function getPromisesFromComponents (components, store) {
  return components
    .filter( (component) => getFetchDataFromComponent(component) )
    .map(getFetchDataFromComponent)
    .map( (fetchData) => fetchData(store) );
}

export function fetchDataForComponents (components, store) {
    return Promise.all(getPromisesFromComponents(components, store));
}

export default function requireData (fetchData) {
  return function compose(OriginalComponent) {

    class ComposedComponent extends Component {

      static contextTypes = {
        store: React.PropTypes.object
      }

      static fetchData = fetchData

      componentDidMount () {
        ComposedComponent.fetchData(this.context.store);
      }

      render () {
        return <OriginalComponent {...this.props} />;
      }
    }

    return ComposedComponent;
  };
}