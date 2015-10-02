/**
 * Base application component
 * @module
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

class App extends Component {
  render () {
    return (
      <div>
        <Link to="/front">Front</Link>
        <Link to="/widgets">Widgets</Link>
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;