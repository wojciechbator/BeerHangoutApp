import React, { Component } from 'react';

import Navbar from './components/presentation/Navbar';

class App extends Component {

  render() {
    return (
      <div className="container">
        <Navbar />
        {this.props.children}
      </div>
    );
  }
}

export default App;