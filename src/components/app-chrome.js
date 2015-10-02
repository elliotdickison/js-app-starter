/**
 * Application chrome
 * @module
 */

import React, { Component } from 'react';
import { Link } from 'react-router';

class AppChrome extends Component {
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

export default AppChrome;