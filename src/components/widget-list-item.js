import React from 'react';
import Reflux from 'reflux';
import WidgetActions from '../actions/widget-actions';

export default React.createClass({

    propTypes: {
        index: React.PropTypes.number.isRequired,
        widget: React.PropTypes.object.isRequired,
    },

    onDestroyWidgetClick: function () {
        WidgetActions.destroyWidget(this.props.index);
    },

    render: function () {
        return (
            <li>
                {this.props.widget.name}
                <input type="button" value="Destroy" onClick={this.onDestroyWidgetClick} />
            </li>
        );
    },

});