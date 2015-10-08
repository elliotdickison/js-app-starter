/**
 * A list of all widgets. This is a "smart component", meaning that it's
 * connected to redux, receiving state and bound action creators in the form of
 * props. It's also a "container", meaning that a route is mapped directly to
 * it. It uses the requireData decorator to specify data that should
 * automatically be fetched (both on the server and client) when it is rendered.
 *
 * @module
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import requireData from '../plumbing/require-data';
import { connect } from 'react-redux';
import * as actions from '../modules/widgets';
import WidgetListItem from './widget-list-item';

function mapStateToProps(state) {
  return {
    widgets: state.get('widgets'),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function fetchWidgets (store) {
  let state = store.getState();
  if (!state.get('widgets').get('loaded') && !state.get('widgets').get('loading')) {
    return store.dispatch(actions.load());
  }
}

@requireData(fetchWidgets)
@connect(mapStateToProps, mapDispatchToProps)
class Widgets extends Component {

  static propTypes = {
    build: PropTypes.func.isRequired,
    asyncBuild: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    widgets: PropTypes.object.isRequired,
  }

  onBuildClick () {
    this.props.build({
      name: this.refs.newWidgetName.getDOMNode().value,
    });
  }

  onAsyncBuildClick () {
    this.props.asyncBuild({
      name: this.refs.newWidgetName.getDOMNode().value,
    });
  }

  onResetClick () {
    this.props.load();
  }

  render () {
    let widgetListItems = this.props.widgets.get('data').map( (widget, index) => {
      return <WidgetListItem key={index} widget={widget} index={index} destroy={this.props.destroy} />;
    });
    return (
      <ul>
        {this.props.widgets.get('loading') ? <li>Loading...</li> : widgetListItems}
        <li>
          <input type="text" ref="newWidgetName" />
          <input type="button" value="Build" onClick={this.onBuildClick.bind(this)} />
          <input type="button" value="Async Build" onClick={this.onAsyncBuildClick.bind(this)} />
        </li>
        <li>
          <input type="button" value="Reset" onClick={this.onResetClick.bind(this)} />
        </li>
      </ul>
    );
  }
}

export default Widgets;