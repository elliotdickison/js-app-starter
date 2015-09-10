import { BUILD_WIDGET, DESTROY_WIDGET } from '../actions/widgets';

export default function widgets(state = [], action = undefined) {
    switch (action.type) {
        case BUILD_WIDGET:
            return [].concat(state, action.payload);
        case DESTROY_WIDGET:
            return state.filter( (widget, index) => {
                return index !== action.payload;
            });
        default:
            return state;
    }
}