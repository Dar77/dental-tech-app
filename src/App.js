import React, { Component } from 'react';
//redux
import { Provider } from "react-redux";
import store from "./store/index";
//redux end
import ResponsiveDrawer from './components/ResponsiveDrawer';
import NavBar from './components/NavBar';

window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

class App extends Component {
  render() {
    return (
    	<Provider store={store}>
        	<ResponsiveDrawer />
        </Provider>
    );
  }
}

export default App;
