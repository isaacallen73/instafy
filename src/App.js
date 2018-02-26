import React, { Component } from 'react';
import 'reset-css/reset.css';
import './App.css';
import queryString from 'query-string';
//import './data_server.js'

let users = require('./data.json')

let white = 'white';
let defaultStyle = {
  color: "#ecebe8"
};

let users = [
  {
    num: '0',
    name: "isaac",
    email: "isaacallen73@gmail.com",
    id: "isaacallen73",
    topArtists: ["Kendrick Lamar", "J. Cole", "Drake"]
  },
  {
    num: '1',
    name: "Tyler",
    email: "tyler@gmail.com",
    id: "taj",
    topArtists: ["Drake", "Migos", "Bryson Tiller"]
  }
]

let counterStyle = {...defaultStyle, 
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
        <img/>
        <input type="text" onKeyUp={event => 
          this.props.onTextChange(event.target.value)}
          style={{...defaultStyle, 
            color: 'black', 
            'font-size': '20px', 
            padding: '10px'}}/>
      </div>
    );
  }
}

class Profile extends Component {
  render() {
    let user = this.props.user
    return (
      <div style={{...defaultStyle, 
        display: 'inline-block',
        width: "25%",
        padding: '10px',
        }}>
        <h2>{user.name}</h2>
        <ul style={{'margin-top': '10px', 'font-weight': 'bold'}}>
          {user.topArtists.map(artist => 
            <li style={{'passing-top': '2px'}}>{artist.name}</li>
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
      <div style={{...defaultStyle, 
        display: 'inline-block', 
        width: "25%",
        padding: '10px',
        'background-color': isEven(this.props.index) 
          ? '#C0C0C0' 
          : '#808080'
        }}>
        <h2>{playlist.name}</h2>
        <img src={playlist.imageUrl} style={{width: '60px'}}/>
        <ul style={{'margin-top': '10px', 'font-weight': 'bold'}}>
          {playlist.songs.map(song => 
            <li style={{'padding-top': '2px'}}>{song.name}</li>
          )}
        </ul>
      </div>
    );
  }
}

class Title extends Component {
  render() {
    return (
      <div>
        <h1 style={{ color: "#84bd00" }}>{users[0].name}'s instafy</h1>
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
            <li>{
              this.user.topArtists[0]
              }</li>
            <li>{users[0].topArtists[1]}</li>
            <li>{users[0].topArtists[2]}</li>
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
  constructor() {
    super();
    this.users = {}
    this.state = {
      serverData: {
        users: []
      },
      filterString: ''
    }
  }
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;
    if (!accessToken)
      return;
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
/*
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


