import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WidgetActions from '../actions/widgets';
import WidgetListItem from '../components/widget-list-item';

class Widgets extends Component {

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
                <li>
                    <input type="text" ref="newWidgetName" />
                    <input type="button" value="Build" onClick={this.onBuildWidgetClick.bind(this)} />
                    <input type="button" value="Async Build" onClick={this.onAsyncBuildWidgetClick.bind(this)} />
                </li>
            </ul>
        );
    }
}

Widgets.propTypes = {
    build: PropTypes.func.isRequired,
    asyncBuild: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    widgets: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(WidgetActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);