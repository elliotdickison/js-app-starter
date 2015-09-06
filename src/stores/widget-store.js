var Reflux = require('reflux');
var assign = require('object-assign');

var WidgetActions = require('../actions/widget-actions');

export default Reflux.createStore({

    listenables: [WidgetActions],

    getInitialState: function () {
        this.widgets = [];
        return this.widgets;
    },

    onBuildWidget: function (data) {
        this.widgets.push(data);
        this.trigger(this.widgets);
    },

    onDestroyWidget: function (index) {
        this.widgets.splice(index, 1);
        this.trigger(this.widgets);
    },
});
