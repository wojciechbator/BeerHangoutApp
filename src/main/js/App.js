import React, { Component } from 'react';

import Home from './components/layout/Home';
import Navbar from './components/presentation/Navbar';

class App extends Component {

  render() {
    return (
      <div>
        <Navbar />
        <Home />
      </div>
    );
  }
}

export default App;