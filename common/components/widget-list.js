import React, { Component, PropTypes } from 'react';
import WidgetListItem from './widget-list-item';

class WidgetList extends Component {

    onBuildWidgetClick () {
        this.props.build({
            name: this.refs.newWidgetName.getDOMNode().value,
        });
    }

    onAsyncBuildWidgetClick () {
        this.props.asyncBuild({
            name: this.refs.newWidgetName.getDOMNode().value,
        });
    }

    render () {
        const widgetListItems = this.props.widgets.map( (widget, index) => {
            return <WidgetListItem key={index} widget={widget} index={index} destroy={this.props.destroy} />;
        });
        return (
            <ul>
                {widgetListItems}
                <li className="widget-form">
                    <input type="text" ref="newWidgetName" />
                    <input type="button" value="Build" onClick={this.onBuildWidgetClick.bind(this)} />
                    <input type="button" value="Async Build" onClick={this.onAsyncBuildWidgetClick.bind(this)} />
                </li>
            </ul>
        );
    }
}

WidgetList.propTypes = {
    build: PropTypes.func.isRequired,
    asyncBuild: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    widgets: PropTypes.array.isRequired,
};

export default WidgetList;