import { expect } from 'chai';
import TestDom from '../test-dom';
import React from 'react/addons';
import WidgetList from '../../src/components/widget-list';

TestDom.init();
var TestUtils = React.addons.TestUtils;

describe('WidgetList component', function(){
    before('render and locate element', function() {
        var renderedComponent = TestUtils.renderIntoDocument(
            <WidgetList />
        );
        this.renderedElement = renderedComponent.getDOMNode();
    });

    it('is a list', function() {
        expect(this.renderedElement.tagName).to.equal('UL');
    });

    it('contains a widget form', function() {
        expect(this.renderedElement.querySelector('.widget-form')).to.be.a('object');
    });
});