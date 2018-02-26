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
