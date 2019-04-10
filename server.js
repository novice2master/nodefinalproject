const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');
// const util = require('./utils.js')
const bodyparser = require('body-parser');
// const mongodb = require('mongodb')
const mongoose = require('mongoose')


var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname, + '/public/'));
hbs.registerPartials(__dirname + '/views/partials/');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/userdbase");



var nameSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  email: {type: String, unique:true},
  psw: String
});



var User = mongoose.model('User', nameSchema);

app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.render('index.hbs');
})

app.get('/login.hbs', (request, response) => {
    response.render('login.hbs');
})

app.post('/signup_form', (request, response) => {
	var userInfo = new User(request.body);
  	userInfo.save()
    .then(item => {
      response.render("confirm.hbs");
    })
    .catch(err => {
      response.status(400).send("unable to save to database");
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