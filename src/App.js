import React, { Component } from 'react';
import ResponsiveDrawer from './components/ResponsiveDrawer';
import NavBar from './components/NavBar';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends Component {
  render() {
    return (
      <div>
        <ResponsiveDrawer />
      </div>
    );
  }
}

export default App;
