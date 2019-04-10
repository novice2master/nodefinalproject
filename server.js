const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser')
const MongoClient = require('mongodb').MongoClient;
const utils = require('./utils');

var app = express();
app.use(cookieParser())
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname, + '/public/'));
hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
})

app.set('view engine', 'hbs');

//Homepage
app.get('/', (request, response) => {
    response.render('index.hbs');
})

//Latest Music thread page
app.get('/latest_music.hbs', (request, response) => {
  response.render('latest_music.hbs');
})



//Signup Page
app.get('/signup.hbs', (request, response) => {
  response.render('signup.hbs');
  register.getElements;
})

//Signup Confirmation Page
app.get('/confirm.hbs', (request, response) => {
  response.render('confirm.hbs');
})

//Login Page
app.get('/login.hbs', (request, response) => {
    response.render('login.hbs');
})

//Add user information to database
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
    }, (err) => {
      if(err) {
        response.send('Unable to add user.');
      }
      
      response.render('confirm.hbs');
    })
});

//Logs in user if they match information in database
app.post('/login_form', (request, response) => {
    var email = request.body.email;
    var psw = request.body.psw;
    var db = utils.getDb();
    db.collection('users').findOne({Email: email, Password: psw}).then((doc)=>{
      if(doc == null){
        console.log('Login Failed')
        response.render('login.hbs',{
          login_error:'Incorrect login info...Try Again!!'
        })
      } 
    
      else{
        response.cookie('username', doc.First_Name)
        response.redirect('/');
        alert(response.cookie('username', doc.First_Name));
      }
    })
})

app.post('/thread_form', (request, response) => {
    var email = request.body.fname;
    var title = request.body.lname;
    var message = request.body.email;
    var category = request.body.psw;

    var db = utils.getDb();
    db.collection('threads').insertOne({
      Email: email,
      Title: title,
      Message:message,
      Category: category
    }, (err) => {
      if(err) {
        response.send('Unable to add user.');
      }
      
      response.render('confirm.hbs');
    })
});
//Enters a thread in 



app.listen(8080, () => {
    console.log('Server is up on the port 8080');
    utils.init();
});