import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function configureContainer (Container, config = {}) {

  let ReduxConnected = config.mapStateToProps || config.mapDispatchToProps ?
    connect(config.mapStateToProps, config.mapDispatchToProps)(Container) :
    Container;

  if (!config.fetchData) {
    return ReduxConnected;
  }

  class FetchDataConnected extends Component {

    componentDidMount () {
      FetchDataConnected.fetchData(this.context.store);
    }

    render () {
      return <ReduxConnected {...this.props} />;
    }
  }

  FetchDataConnected.contextTypes = {
    store: React.PropTypes.object
  };

  FetchDataConnected.fetchData = config.fetchData;

  return FetchDataConnected;
}