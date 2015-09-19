import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import configureContainer from '../configure-container';
import { actions } from '../modules/widgets';
import WidgetListItem from '../components/widget-list-item';

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
        let widgetListItems = this.props.widgets.data.map( (widget, index) => {
            return <WidgetListItem key={index} widget={widget} index={index} destroy={this.props.destroy} />;
        });
        return (
            <ul>
                {widgetListItems}
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
    if (!state.widgets.loaded && !state.widgets.loading) {
        return store.dispatch(actions.load());
    }
}

export default configureContainer(Widgets, { mapStateToProps, mapDispatchToProps, fetchData });