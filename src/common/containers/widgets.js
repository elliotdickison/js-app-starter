import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as WidgetActions } from '../modules/widgets';
import WidgetListItem from '../components/widget-list-item';

class Widgets extends Component {

    componentDidMount () {
        Widgets.fetchData(this.context.store);
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
        const widgetListItems = this.props.widgets.data.map( (widget, index) => {
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

Widgets.propTypes = {
    build: PropTypes.func.isRequired,
    asyncBuild: PropTypes.func.isRequired,
    destroy: PropTypes.func.isRequired,
    widgets: PropTypes.object.isRequired,
};

Widgets.contextTypes = {
    store: React.PropTypes.object
};

Widgets.fetchData = (store) => {
    if (!store.getState().widgets.loaded) {
        return store.dispatch(WidgetActions.load());
    }
};

function mapStateToProps(state) {
    return {
        widgets: state.widgets,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(WidgetActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Widgets);