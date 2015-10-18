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
    return store.dispatch(actions.loadWidgets());
  }
}

@requireData(fetchWidgets)
@connect(mapStateToProps, mapDispatchToProps)
class Widgets extends Component {

  static propTypes = {
    buildWidget: PropTypes.func.isRequired,
    destroyWidget: PropTypes.func.isRequired,
    loadWidgets: PropTypes.func.isRequired,
    widgets: PropTypes.object.isRequired,
  }

  onBuildClick () {
    this.props.buildWidget({
      name: this.refs.newWidgetName.value,
    });
  }

  onResetClick () {
    this.props.loadWidgets();
  }

  render () {
    let widgetListItems = this.props.widgets.get('data').map( (widget, index) => {
      return <WidgetListItem key={index} widget={widget} index={index} destroyWidget={this.props.destroyWidget} />;
    });
    return (
      <ul>
        {this.props.widgets.get('loading') ? <li>Loading...</li> : widgetListItems}
        <li>
          <input type="text" ref="newWidgetName" />
          <input type="button" value="Build" onClick={this.onBuildClick.bind(this)} />
        </li>
        <li>
          <input type="button" value="Reset" onClick={this.onResetClick.bind(this)} />
        </li>
      </ul>
    );
  }
}

export default Widgets;