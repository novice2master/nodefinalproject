const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')
const MongoClient = require('mongodb').MongoClient;
const utils = require('./utils');
const md5 = require('md5')


var app = express();
app.use(cookieParser())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname, + '/public/'));
hbs.registerPartials(__dirname + '/views/partials/');

app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.render('index.hbs');
})

app.get('/login.hbs', (request, response) => {
    response.render('login.hbs');
})

app.post('/signup_form', (request, response) => {
  var fname = request.body.fname;
  var lname = request.body.lname;
  var email = request.body.email;
  var psw = request.body.psw;

  var db = utils.getDb();
  db.collection('users').insertOne({
    First_Name: fname,
    Last_Name: lname,
    Email: email,
    Password: psw
  }, (err, result) => {
    if(err) {
      response.send('Unable to add user.');
    }
    response.render('confirm.hbs');
  })
});

app.post('/login_form', (request, response) => {
  var email = request.body.email;
  var psw = request.body.psw;
  var db = utils.getDb();
  db.collection('users').findOne({Email: email, Password: psw}).then((doc)=>{
    if(doc == null){
      console.log('Login Failed')
      response.render('login.hbs',{
        login_error:'Incorrect login info'
      })
    }else{
      response.cookie('username', doc.First_Name)
      response.redirect('/');
    }
  })
})

app.get('/signup.hbs', (request, response) => {
    response.render('signup.hbs');
    register.getElements;
})

app.get('/confirm.hbs', (request, response) => {
    response.render('confirm.hbs');
})

app.listen(8080, () => {
    console.log('Server is up on the port 8080');
    utils.init();
});