import React, { Component } from 'react';
import configureContainer from '../configure-container';

class Front extends Component {
  render () {
    return (
      <div>
        Yo dawg
      </div>
    );
  }
}

export default configureContainer(Front);