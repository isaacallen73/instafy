import React, { Component } from 'react';
import 'reset-css/reset.css';
import './App.css';
import queryString from 'query-string';
//import './data_server.js'
var http = require('http');
var https = require('https');
let dataServer = require('./data_server.js')

let white = 'white';
let defaultStyle = {
  color: "#ecebe8"
};

let counterStyle = {
  ...defaultStyle,
  width: "40%",
  display: 'inline-block',
  'margin-bottom': '20px',
  'font-size': '20px',
  'line-height': '30px'
}

function isEven(number) {
  return number % 2
}

class Filter extends Component {
  render() {
    return (
      <div style={defaultStyle}>
        <img />
        <input type="text" onKeyUp={event =>
          this.props.onTextChange(event.target.value)}
          style={{
            ...defaultStyle,
            color: 'black',
            'font-size': '20px',
            padding: '10px'
          }} />
      </div>
    );
  }
}

class Profile extends Component {
  render() {


    let user = this.props.user
    return (
      <div style={{
        ...defaultStyle,
        display: 'inline-block',
        width: "25%",
        padding: '10px',
      }}>
        <h2>{user.name}</h2>
        <ul style={{ 'margin-top': '10px', 'font-weight': 'bold' }}>
          {user.topArtists.map(artist =>
            <li style={{ 'passing-top': '2px' }}>{artist.name}</li>
          )}
        </ul>
      </div>
    )
  }
}


class Playlist extends Component {
  render() {
    let playlist = this.props.playlist
    return (
      <div style={{
        ...defaultStyle,
        display: 'inline-block',
        width: "25%",
        padding: '10px',
        'background-color': isEven(this.props.index)
          ? '#C0C0C0'
          : '#808080'
      }}>
        <h2>{playlist.name}</h2>
        <img src={playlist.imageUrl} style={{ width: '60px' }} />
        <ul style={{ 'margin-top': '10px', 'font-weight': 'bold' }}>
          {playlist.songs.map(song =>
            <li style={{ 'padding-top': '2px' }}>{song.name}</li>
          )}
        </ul>
      </div>
    );
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
        <h3>users[1].name</h3>
        <button>Create Playlist</button>
        <ul>
          <li>users[1].topArtists[0]</li>
          <li>users[1].topArtists[1]</li>
          <li>users[1].topArtists[2]</li>
          <li>users.length</li>
        </ul>
      </div>
    )
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      user: null,
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    console.log('hello')
    if (!accessToken)
      return;
    fetch('http://localhost:8888/getuserdata', {
      //headers: {'Authorization': 'Bearer ' + accessToken},
      method: 'GET'
    })
      .then(response => response.json())
      .then(data => this.setState({
            user: {
              userID: data.userID,
              longTermArtists: data.longTermArtists,
              shortTermArtists: data.shortTermArtists,
              longTermTracks: data.longTermTracks,
              shortTermTracks: data.shortTermTracks,
              country: data.country
            }
          }
      ))
      dataServer.post(this.state.user)
  }

  //       console.log(response);
  /*
          fetch('https://api.spotify.com/v1/me', {
            headers: {'Authorization': 'Bearer ' + accessToken}})
            .then(response => response.json())
            .then(data => this.setState({
              user: {
                name: data.id
            }
          }))
  */
  /*        if (response.data && response.data.displayName.indexOf(' ') > 0) {
            let displayName = " " + response.data.displayName.substring(0, response.data.displayName.indexOf(' '));
          }
          else if (response.data.displayName == null) {
            let displayName = "";
          }
          if (response.data.imageURL.length > 0) {
            let imageURL = response.data.imageURL[0].url;
          } else {
            let imageURL = null;
          }
          */
  //        let longTermArtists = response.longTermArtists.items;
  //        let shortTermArtists = response.data.shortTermArtists.items;
  //        let longTermTracks = response.data.longTermTracks.items;
  //        let shortTermTracks = response.data.shortTermTracks.items;

  render() {
    /*
    let playlistToRender =
      this.state.user.userID &&
        this.state.playlists
        ? this.state.playlists.filter(playlist => {
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase())
          let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
            .includes(this.state.filterString.toLowerCase()))
          return matchesPlaylist || matchesSong
        }) : []
        */
    return (
      <div className="App">
        {this.state.user ?
          <div>
            <h1 style={{ color: "#84bd00", fontSize:'32px' }}>{this.state.user.userID}'s instafy</h1>
            <h3 style={{ color: "#84bd00" }}>Top Artists:
              <ul>
                <li>{this.state.user.shortTermArtists.items[0].name}</li>
                <li>{this.state.user.shortTermArtists.items[1].name}</li>
                <li>{this.state.user.shortTermArtists.items[2].name}</li>
              </ul>
            </h3>
          <Search />
          <User /><User /><User />
        </div>
      : <button onClick={() => {
        window.location = window.location.href.includes('localhost')
          ? 'http://localhost:8888/login'
          : 'https://insta-fy-backend.herokuapp.com/login'
         }
         }
           style={{ padding: '20px', 'font-size': '50px', 'margin-top': '20px' }}>Sign in with Spotify</button>
      }
      </div>
    );
  }
}


export default App;




      /*
    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}})
      .then(response => response.json())
      .then(data => this.setState({
        user: {
          name: data.id
      }
    }))

    fetch('https://api.spotify.com/v1/me/top/artists?limit=50', {
      headers: {
        'Authorization': 'Bearer ' + accessToken, 
    }
    }).then(response => response.json())
    .then(artistData => this.setState({
      user: {
        topArtists: [artistData.items[0].name, artistData.items[1].name, artistData.items[2].name]
      }
    }))
    

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(response => response.json())
    .then(playlistData => {
      let playlists = playlistData.items
      let trackDataPromises = playlists.map(playlist => {
        let responsePromise = fetch(playlist.tracks.href, {
          headers: {'Authorization': 'Bearer ' + accessToken}
        })
        let trackDataPromise = responsePromise
          .then(response => response.json())
        return trackDataPromise
      })
      let allTracksDataPromises = 
        Promise.all(trackDataPromises)
      let playlistsPromise = allTracksDataPromises.then(trackDatas => {
        trackDatas.forEach((trackData, i) => {
          playlists[i].trackDatas = trackData.items
            .map(item => item.track)
            .map(trackData => ({
              name: trackData.name,
              duration: trackData.duration_ms / 1000
            }))
        })
        return playlists
      })
      return playlistsPromise
    })
    .then(playlists => this.setState({
      playlists: playlists.map(item => {
        return {
          name: item.name,
          imageUrl: item.images[0].url, 
          songs: item.trackDatas.slice(0,3)
        }
    })
    }))

  }
  render() {
    let playlistToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist => {
          let matchesPlaylist = playlist.name.toLowerCase().includes(
            this.state.filterString.toLowerCase()) 
          let matchesSong = playlist.songs.find(song => song.name.toLowerCase()
            .includes(this.state.filterString.toLowerCase()))
          return matchesPlaylist || matchesSong
        }) : []
        

    return (
      <div className="App">
        {this.state.user ?
        <div>
          <h1 style={{...defaultStyle, 
            'font-size': '54px',
            'margin-top': '5px'
          }}>
            {this.state.user.name}'s Playlists
          </h1>
          <Filter onTextChange={text => {
              this.setState({filterString: text})
            }}/>
          {playlistToRender.map((playlist, i) => 
            <Playlist playlist={playlist} index={i} />
          )}
        </div> : <button onClick={() => {
            window.location = window.location.href.includes('localhost') 
              ? 'http://localhost:8888/login' 
              : 'https://insta-fy-backend.herokuapp.com/login' }
          }
          style={{padding: '20px', 'font-size': '50px', 'margin-top': '20px'}}>Sign in with Spotify</button>
        }
      </div>
    );
*/
