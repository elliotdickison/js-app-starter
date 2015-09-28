import { expect } from 'chai';
import { Map } from 'immutable';
import { noop, renderComponent } from '../test-utils';
import WidgetListItem from '../../src/common/components/widget-list-item';

describe('WidgetListItem component', function(){
  let testProps = {
    index: 0,
    widget: Map({
      name: 'I be in the town all day',
    }),
    destroy: noop,
  };
  let widgetListItem = renderComponent(WidgetListItem, testProps);

  console.log(widgetListItem.props.children);
  it('is a list item', function() {
    expect(widgetListItem.type).to.equal('li');
  });

  it('contains the widget name', function() {
    expect(widgetListItem.props.children).to.contain(testProps.widget.get('name'));
  });

  it('contains a "Destroy" button', function() {
    let button = widgetListItem.props.children.find( (child) => child.type === 'input' );
    expect(button).to.be.a('object');
    expect(button.props.value).to.equal('Destroy');
  });
});