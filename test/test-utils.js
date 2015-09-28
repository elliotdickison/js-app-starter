import React from 'react/addons';
let TestUtils = React.addons.TestUtils;

export function noop () {
  return null;
}

export function renderComponent (component, props, ...children) {
  let renderer = TestUtils.createRenderer();
  renderer.render(React.createElement(component, props, children));
  return renderer.getRenderOutput();
}

export default TestUtils;