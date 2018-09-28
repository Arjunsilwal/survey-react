import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Surveyreact from './Surveyreact';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
      
        <Surveyreact />
      </div>
    );
  }
}

export default App;
