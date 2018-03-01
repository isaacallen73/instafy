class Database extends Component{
    constructor(users){
        this.users=users
    }

    addUser(User){
        
    }

}

class User extends Database{
    
    constructor(userID){
        this.id=userID
    }
    
    addArtistsS(artists){
        this.artistsS=artists
    }

    addSongsS(songs){
        this.songsS=songs
    }

    addArtistsL(artists){
        this.artistsL=songs
    }

    addSongsL(songs){
        this.songsL=songs
    }

}