/**
 * Represents one widget in a list.
 *
 * @module
 */

import React, { Component, PropTypes } from 'react';
import getPureRenderFunction from '../plumbing/get-pure-render-function';

class WidgetListItem extends Component {

  static propTypes = {
    index: PropTypes.number.isRequired,
    widget: PropTypes.object.isRequired,
    widgetDestroyed: PropTypes.func.isRequired,
  }

  shouldComponentUpdate = getPureRenderFunction()

  onDestroyWidgetClick () {
    this.props.widgetDestroyed(this.props.index);
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