import test from 'tape';
import TestUtils, { renderComponent } from '../test-utils';
import { Map } from 'immutable';
import WidgetListItem from '../../src/components/widget-list-item';

test('WidgetListItem component', function(t){
  t.plan(5);

  let testProps = {
    index: 0,
    widget: Map({
      name: 'I be in the town all day',
    }),
    destroyWidget: (index) => {
      t.equal(index, 0, 'The widget index is passed to the destroy click handler')
    },
  };
  let widgetListItem = renderComponent(WidgetListItem, testProps);

  t.equal(widgetListItem.type, 'li', 'Found a list item element');

  t.ok(~widgetListItem.props.children.indexOf(testProps.widget.get('name')), 'The widget name is included');

  let button = widgetListItem.props.children.find( (child) => child.type === 'input' );
  t.equal(typeof button, 'object', 'Found a button');
  t.equal(button.props.value, 'Destroy', 'The button is labelled "Destroy"');
  button.props.onClick();
});