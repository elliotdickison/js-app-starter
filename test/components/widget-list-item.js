import { expect } from 'chai';
import TestDom from '../test-dom';
import React from 'react/addons';
import WidgetListItem from '../../common/components/widget-list-item';

TestDom.init();
const TestUtils = React.addons.TestUtils;
const noop = () => null

describe('WidgetListItem component', function(){
    const testIndex = 0;
    const testWidget = {
        name: 'I be in the town all day',
    };
    before('render and locate element', function() {
        const renderedComponent = TestUtils.renderIntoDocument(
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
        const button = this.renderedElement.querySelector('input[type=button]');
        expect(button).to.be.a('object');
        expect(button.value).to.equal('Destroy');
    });
});