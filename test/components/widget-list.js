import { expect } from 'chai';
import TestDom from '../test-dom';
import React from 'react/addons';
import WidgetList from '../../common/components/widget-list';

TestDom.init();
const TestUtils = React.addons.TestUtils;
const noop = () => null

describe('WidgetList component', function(){
    before('render and locate element', function() {
        const renderedComponent = TestUtils.renderIntoDocument(
            <WidgetList build={noop} asyncBuild={noop} destroy={noop} widgets={[]} />
        );
        this.renderedElement = React.findDOMNode(renderedComponent);
    });

    it('is a list', function() {
        expect(this.renderedElement.tagName).to.equal('UL');
    });

    it('contains a widget form', function() {
        expect(this.renderedElement.querySelector('.widget-form')).to.be.a('object');
    });
});