import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let white = 'white';
let defaultStyle = {
  color: "#ecebe8"
};

class Search extends Component {
  render () {
    return (
      <div style={{defaultStyle}}>
      <img/>
      <input type="text"/>
      </div>
    )
  }
}

class User extends Component {
  render () {
    return (
      <div style={{...defaultStyle, width: "30%", display: "inline-block"}}>
      <img/>
      <h3>User</h3>
      <button>Create Playlist</button>
      <ul><li>Genre 1</li><li>Genre 2</li><li>Genre 3</li></ul>
        </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
      <h1 style={{color: "#84bd00"}}>instafy</h1>
      <Search/>
      <User/><User/><User/>
      </div>
    );
  }
}

export default App;
