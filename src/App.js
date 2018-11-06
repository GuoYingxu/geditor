import React, { Component,StyleSheet } from 'react';
import './App.css';
import GEditor from './components/GEditor';
class App extends Component {
  render() {
   return  <div className="page">
      <GEditor/>
    </div>
  }
}

export default App;
