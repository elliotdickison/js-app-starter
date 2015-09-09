import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import WidgetList from './components/widget-list';
import * as WidgetActions from './actions/widgets';

function mapStateToProps(state) {
    return {
        widgets: state.widgets
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(WidgetActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(WidgetList);