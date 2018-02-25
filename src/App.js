import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

let white = 'white';
let defaultStyle = {
  color: "#ecebe8"
};

let sampleUserData = [
  {
    name: "isaac",
    email: "isaacallen73@gmail.com",
    username: "isaacallen73",
    topArtists: ["Kendrick Lamar", "J. Cole", "Drake"]
  },
  {
    name: "Tyler",
    email: "tyler@gmail.com",
    username: "696969",
    topArtists: ["Drake", "Migos", "Bryson Tiller"]
  }
]

class Title extends Component {
  render() {
    return (
      <div>
        <h1 style={{ color: "#84bd00" }}>{sampleUserData[0].name}'s instafy</h1>
      </div>
    )
  }
}

class TopArtists extends Component {
  render () {
    return (
      <div>
        <h3>
          <ul>
            <li>{sampleUserData[0].topArtists[0]}</li>
            <li>{sampleUserData[0].topArtists[1]}</li>
            <li>{sampleUserData[0].topArtists[2]}</li>
          </ul>
        </h3>
      </div>
    )
  }
}

class Search extends Component {
  render() {
    return (
      <div style={{ defaultStyle }}>
        <img />
        <input type="text" />
      </div>
    )
  }
}

class User extends Component {
  render() {
    return (
      <div style={{ ...defaultStyle, width: "30%", display: "inline-block" }}>
        <img />
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
        <Title/>
        <TopArtists/>
        <Search/>
        <User/><User/><User/>
      </div>
    );
  }
}

export default App;
