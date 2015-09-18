import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

export default function configureContainer (Container, config = {}) {

    let ReduxConnected = connect(config.mapStateToProps, config.mapDispatchToProps)(Container);

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