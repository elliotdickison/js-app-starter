import React from 'react';
import Reflux from 'reflux';
import WidgetStore from '../stores/widget-store';
import WidgetActions from '../actions/widget-actions';
import WidgetListItem from './widget-list-item';

export default React.createClass({

    mixins: [Reflux.connect(WidgetStore, "widgets")],

    onBuildWidgetClick: function () {
        WidgetActions.buildWidget({
            name: this.refs.newWidgetName.getDOMNode().value,
        });
    },

    render: function () {
        var widgetListItems = this.state.widgets.map(function (widget, index) {
            return <WidgetListItem key={index} widget={widget} index={index} />;
        });
        return (
            <ul>
                {widgetListItems}
                <li className="widget-form">
                    <input type="text" ref="newWidgetName" />
                    <input type="button" value="Build" onClick={this.onBuildWidgetClick} />
                </li>
            </ul>
        );
    },

});