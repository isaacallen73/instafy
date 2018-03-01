
var fs = require('fs');
var http = require('http');
var https = require('https');
//var privateKey  = fs.readFileSync('/etc/letsencrypt/live/obscurifymusic.com/privkey.pem', 'utf8');
//var certificate = fs.readFileSync('/etc/letsencrypt/live/obscurifymusic.com/fullchain.pem', 'utf8');

//var credentials = { key: privateKey, cert: certificate };

var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const async = require('async');
var moment = require('moment');
var mongo = require('mongodb');

var app = express();

app.use(express.static(__dirname))
    .use(bodyParser.json())
    .use(cookieParser())
    .use(function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    });

app.post('/api/saveUserHistory', function (req, res) {
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:3001/users";

    var historyInstance = {
        //        'shortTermArtistIDs': req.body.shortTermArtistIDs,
        //        'shortTermTrackIDs': req.body.shortTermTrackIDs,
        //        'longTermArtistIDs': req.body.longTermArtistIDs,
        //        'longTermTrackIDs': req.body.longTermTrackIDs,
        'test': test
    };

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;

        var dbo = db.db("mydb");
        if (dbo.collection("users") == undefined) {
            dbo.createCollection("users", function (err, res) {
                if (err) throw err;
                console.log("Collection created!");
            })
        }
        dbo.collection("users").insertOne(historyInstance, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            // db.close();
        });
        //db.close();
    });

    return res.json(
        {
            "status": "ok!"
        }
    )
})


app.get('/api/getUserHistory', function (req, res) {

    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://localhost:3001/users";

    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");

        dbo.collection("users").find({ userID: req.query.userID }, {
            //only supposed to specify what you DON'T want returned
            _id: false,
            //userID: true,
            test: false
            //        longTermArtistIDs:false,
            //        longTermTrackIDs:false,
            //        shortTermArtistIDs:false,
            //        shortTermTrackIDs:false,
            //userHistory:true
        }).toArray(function (err, result) {
            if (err) throw err;
            if (result[0] == undefined) {
                res.send({
                    'userID': req.query.userID,
                    'userHistory': null
                });
            } else {
                res.send({
                    'userID': req.query.userID,
                    'userHistory': result[0].userHistory
                });
            }
            //db.close();
        });
    });

});
let port = process.env.PORT || 3001
console.log(`Listening on port ${port}. Go /login to initiate authentication flow.`)
app.listen(port)

/*
const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()

var db;

MongoClient.connect('mongodb://instafy:cornell@ds249428.mlab.com:49428/instafy', function(err, database) {
  if (err) return console.log(err)
  db = database
  app.listen(8000, function () {
    console.log('listening on port 8000')
  })
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/todo', function(req, res) {
    console.log(req.body)
    db.collection('todo').save(req.body, res, function (err, result){
        if (err) return console.log('error')

        console.log('saved to db')
        res.redirect('/')
    })
})
*/
