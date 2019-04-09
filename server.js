const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');
const bodyparser = require('body-parser');
// const mongodb = require('mongodb');
const mongoose = require('mongoose')
// var MongoClient = mongodb.MongoClient;


var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname, + '/public/'));
hbs.registerPartials(__dirname + '/views/partials/');

// var uri = "mongodb+srv://email:password@helpbook-rlpsi.gcp.mongodb.net/test?retryWrites=true";


// var dbConn = MongoClient.connect(uri, { useNewUrlParser: true });
// dbConn.then(function(client) {
//     app.post('/signup', function (req, res) {
//         delete req.body._id; // for safety reasons
//         client.db("Users").collections("partners").insertOne(req.body);
//         console.log('test');
//     });
// })
// .catch(function(err){
//     console.log(err)
// });

// var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/userdbase");

var nameSchema = new mongoose.Schema({
  FirstName: String,
  LastName: String,
  Email: String,
  Password: String
});

var User = mongoose.model('User', nameSchema);

app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.render('index.hbs');
})

app.get('/login.hbs', (request, response) => {
    response.render('login.hbs');
})

app.post('./signup_form', (request, response) => {
	var userInfo = new User(req.body);
  	userInfo.save()
    .then(item => {
      res.send("item saved to database");
    })
    .catch(err => {
      res.status(400).send("unable to save to database");
    });

});

app.get('/signup.hbs', (request, response) => {
    response.render('signup.hbs');
    register.getElements;
})

app.get('/confirm.hbs', (request, response) => {
    response.render('confirm.hbs');
})

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
});