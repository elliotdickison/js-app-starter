import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function container ({mapStateToProps, mapDispatchToProps, fetchData}) {
  return function decorator(Container) {

    if (mapStateToProps || mapDispatchToProps) {

    }
      connect(mapStateToProps, mapDispatchToProps)(Container)
      : Container;

    class DataConnected extends Component {

      static contextTypes = {
        store: React.PropTypes.object
      }

      static fetchData = fetchData

      componentDidMount () {
        DataConnected.fetchData(this.context.store);
      }

      render () {
        return <ReduxConnected {...this.props} />;
      }
    }

    return DataConnected;
  };
}