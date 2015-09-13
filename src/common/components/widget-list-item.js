import React, { Component, PropTypes } from 'react';

class WidgetListItem extends Component {

    onDestroyWidgetClick () {
        this.props.destroy(this.props.index);
    }

    render () {
        return (
            <li>
                {this.props.widget.name}
                <input type="button" value="Destroy" onClick={this.onDestroyWidgetClick.bind(this)} />
            </li>
        );
    }
}

WidgetListItem.propTypes = {
    index: PropTypes.number.isRequired,
    widget: PropTypes.object.isRequired,
    destroy: PropTypes.func.isRequired,
};

export default WidgetListItem;