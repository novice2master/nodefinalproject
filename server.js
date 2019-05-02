const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const utils = require('./utils');
const port = process.env.PORT || 8080;
var app = express();
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname, + '/public/'));
hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

app.set('view engine', 'hbs');

//Homepage
app.get('/', (request, response) => {
    response.render('index.hbs');
});

//General Music thread page
app.get('/general_music.hbs', (request, response) => {
    let db = utils.getDb();
    db.collection('threads').find({}).toArray(function(err, threads){
        if(err){
            console.log(err);
            response.send('Unable to retrieve posts');
        }
        else{
            // console.log(threads);
            response.render('general_music.hbs', {
                objects: threads
            });

        }
    });

});

//Music Reviews thread page
// app.get('/music_reviews.hbs', (request, response) => {
//   response.render('music_reviews.hbs');
// })

//Latest Music thread page
app.get('/latest_music.hbs', (request, response) => {
  response.render('latest_music.hbs');
});

//Create Post Page
app.get('/create_post.hbs', (request, response) => {
  response.render('create_post.hbs');
  register.getElements;
});

//Signup Page
app.get('/signup.hbs', (request, response) => {
  response.render('signup.hbs');
  register.getElements;
})

//Signup Confirmation Page
app.get('/confirm.hbs', (request, response) => {
  response.render('confirm.hbs');
});

//Login Page
app.get('/login.hbs', (request, response) => {
    response.render('login.hbs');
});

// app.get('/login2.hbs', (request, response) => {
//     response.render('login2.hbs');
// })

//Add user information to database
app.post('/signup_form', (request, response) => {
    var fname = request.body.fname;
    var lname = request.body.lname;
    var email = request.body.email;
    var psw = request.body.password;
    var db = utils.getDb();
    var user = db.collection('users');

    if (
        request.body.captcha === undefined ||
        request.body.captcha === "" ||
        request.body.captcha === null
    ) {
        return response.json({"success": false, "msg": "please select captcha"});
    }

    // Secret Key
    const secretKey = '6LfWI6EUAAAAAEnFDSW9SMUiqH4ns05r_-ZGzNhV';

    // Verify URL
    const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${request.body.captcha}
    &remoteip=${request.connection.remoteAddress}`;

    // Make Request to VerifyURL
    request(verifyURL, (err, response, body) => {
        body = JSON.parse(body);

        //If Not Successful
        if (body.success !== undefined && !body.success) {
            return response.json({"success": false, "msg": "Failed captcha verification"});
        }

        user.findOne({Email: email}, function (err, users) {
            if (err) {
                console.log(err);
                response.send('unable to add user')
            } else if (users != null) {
                response.render('signup.hbs', {
                    signup_error: 'cannot add user...user already exists!!'
                })
            } else {
                user.insertOne({
                    First_Name: fname,
                    Last_Name: lname,
                    Email: email,
                    Password: psw
                });
                response.render('confirm.hbs');
            }
        });
    });
});

//Logs in user if they match information in database
app.post('/login_form', (request, response) => {
    var email = request.body.email;
    var psw = request.body.psw;
    var db = utils.getDb();
    db.collection('users').findOne({Email: email, Password: psw}).then((doc)=>{
      if(doc == null){
        console.log('Login Failed');
        response.render('login.hbs',{
          login_error:'Incorrect login info...Try Again!!'
        })
      }

      else{
        response.cookie('username', doc.First_Name);
        response.redirect('/');
      }
    })
});

//Enters a thread in a database
app.post('/thread_form', (request, response) => {
    var email = request.body.email;
    var title = request.body.title;
    var message = request.body.message;
    var category = request.body.categories;

    var db = utils.getDb();
    db.collection('threads').insertOne({
      Email: email,
      Title: title,
      Message: message,
      Category: category
    }, (err) => {
      if(err) {
        response.send('Unable to add user.');
      }
      
      response.render('postconfirm.hbs');
    })
});


app.get('/music_reviews.hbs', (request, response) => {
  var db = utils.getDb();
  db.collection('threads').find({}).toArray(function(err, threads){
      if(err){
        console.log(err);
        response.send('Unable to retrieve posts');
      }
      else{
        response.send(threads);
        // console.log(threads)
        
      }
  });
});


app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
