import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import container from '../utils/container';
import * as actions from '../modules/widgets';
import WidgetListItem from '../components/widget-list-item';

function mapStateToProps(state) {
  return {
    widgets: state.widgets,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actions, dispatch);
}

function fetchData (store) {
  let state = store.getState();
  if (!state.widgets.get('loaded') && !state.widgets.get('loading')) {
    return store.dispatch(actions.load());
  }
}

@container({mapStateToProps, mapDispatchToProps, fetchData})
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