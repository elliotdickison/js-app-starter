import React, { Component, PropTypes } from 'react';

export default function fetchData (fetchData) {
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