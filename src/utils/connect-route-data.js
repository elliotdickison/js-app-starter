import React, { Component, PropTypes } from 'react';

function getFetchDataFromRoute (route) {
  return route.WrappedComponent ? getFetchDataFromRoute(route.WrappedComponent) : route.fetchData;
}

function getPromisesFromRoutes (routes, store) {
  return routes
    .filter( (route) => getFetchDataFromRoute(route) )
    .map(getFetchDataFromRoute)
    .map( (fetchData) => fetchData(store) );
}

export function fetchDataForRoutes (routes, store) {
    return Promise.all(getPromisesFromRoutes(routes, store));
}

export default function connectRouteData (fetchData) {
  return function decorator(OriginalComponent) {

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