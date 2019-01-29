import React, { Component } from 'react';
import AppBar from '../AppBar/AppBar.jsx';
import Products from '../Products/Products.jsx';
import Snackbar from '../../components/Snackbar/Snackbar.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppBar />
        <Products />
        <Snackbar />
      </div>
    );
  }
}

export default App;
