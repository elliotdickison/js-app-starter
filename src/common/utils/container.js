import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function container ({mapStateToProps, mapDispatchToProps, fetchData}) {
  return function decorator(Container) {

    let ReduxConnected = connect(mapStateToProps, mapDispatchToProps)(Container);

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