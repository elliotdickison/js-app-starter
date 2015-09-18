import { expect } from 'chai';
import TestDom from '../test-dom';
import React from 'react/addons';
import WidgetListItem from '../../src/common/components/widget-list-item';

TestDom.init();
let TestUtils = React.addons.TestUtils;
let noop = () => null

describe('WidgetListItem component', function(){
    let testIndex = 0;
    let testWidget = {
        name: 'I be in the town all day',
    };
    before('render and locate element', function() {
        let renderedComponent = TestUtils.renderIntoDocument(
            <WidgetListItem index={testIndex} widget={testWidget} destroy={noop} />
        );
        this.renderedElement = React.findDOMNode(renderedComponent);
    });

    it('is a list item', function() {
        expect(this.renderedElement.tagName).to.equal('LI');
    });

    it('contains the widget name', function() {
        expect(this.renderedElement.textContent).to.contain(testWidget.name);
    });

    it('contains a "Destroy" button', function() {
        let button = this.renderedElement.querySelector('input[type=button]');
        expect(button).to.be.a('object');
        expect(button.value).to.equal('Destroy');
    });
});