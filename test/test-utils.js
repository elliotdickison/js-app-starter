/**
 * Commonly used test utilities
 *
 * @module
 */

import React from 'react/addons';
let TestUtils = React.addons.TestUtils;

/**
 * Always returns null, handy for stubbing props that require functions
 *
 * @returns null
 */
export function noop () {
  return null;
}

/**
 * Shallow renders a stateless component
 *
 * @param {Object} A React component
 * @param {Object} The props to pass to the component
 * @param {Object[]} Any children to render into the component
 *
 * @returns {Object} An object representation of the rendered component
 */
export function renderComponent (component, props, ...children) {
  let renderer = TestUtils.createRenderer();
  renderer.render(React.createElement(component, props, children));
  return renderer.getRenderOutput();
}

export default TestUtils;