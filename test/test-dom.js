import jsdom from 'jsdom';

export default {
    DEFAULT_MARKUP: '<!doctype html><html><body></body></html>',
    init: function (markup) {
        if (typeof document === 'undefined') {
            global.document = jsdom.jsdom(markup || this.DEFAULT_MARKUP);
            global.window = document.defaultView;
            global.navigator = { userAgent: 'node.js' };
        }
    },
};