import React, { Component, PropTypes } from 'react';
import shouldPureComponentUpdate from '../utils/should-pure-component-update';

class WidgetListItem extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    widget: PropTypes.object.isRequired,
    destroy: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = shouldPureComponentUpdate

  onDestroyWidgetClick () {
    this.props.destroy(this.props.index);
  }

  render () {
    return (
      <li>
        {this.props.widget.get('name')}
        <input type="button" value="Destroy" onClick={this.onDestroyWidgetClick.bind(this)} />
      </li>
    );
  }
}

export default WidgetListItem;