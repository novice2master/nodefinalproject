const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const utils = require('./utils');
const port = process.env.PORT || 8080;
const session = require('express-session');
var app = express();
app.use(cookieParser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(express.static(__dirname, + '/public/'));
hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.use(session({
    secret: 'very safe',
    resave: true,
    saveUninitialized: false,
}));

app.set('view engine', 'hbs');

//Homepage
app.get('/', (request, response) => {

    {
        try {
            if (typeof request.session.email !== "undefined") {
                response.render('index.hbs', {
                        disabled: null
                    })
            } else
                throw new Error("User is not signed-in")
        } catch (e) {
            console.log(e.message);
            response.render('index.hbs', {
                disabled: 'disabled'
            })
        }


    }});

//General Music thread page
app.get('/general_music', (request, response) => {
    let db = utils.getDb();
    db.collection('threads').find({Category: 'general_music_discussion'}).toArray(function(err, threads){
        if(err){
            console.log(err);
            response.send('Unable to retrieve posts');
        }
        else{
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('general_music.hbs', {
                        objects: threads,
                        disabled: null
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('general_music.hbs', {
                    objects: threads,
                    disabled: 'disabled'
                })
            }}
    });

});


app.get('/all_posts', (request, response) => {
    let db = utils.getDb();
    db.collection('threads').find({}).toArray(function(err, threads){
        if(err){
            console.log(err);
            response.send('Unable to retrieve posts');
        }
        else{
            // console.log(threads);
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('all_posts.hbs', {
                        objects: threads,
                        disabled: null
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('all_posts.hbs', {
                    objects: threads,
                    disabled: 'disabled'
                })}
        }
    });

    // response.render('all_posts.hbs');
});

app.get('/off_topic', (request, response) => {
    let db = utils.getDb();
    db.collection('threads').find({Category: 'off_topic_discussion'}).toArray(function(err, threads){
        if(err){
            console.log(err);
            response.send('Unable to retrieve posts');
        }
        else{
            // console.log(threads);
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('off_topic.hbs', {
                        objects: threads,
                        disabled: null
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('off_topic.hbs', {
                    objects: threads,
                    disabled: 'disabled'
                })}


        }

    // response.render('off_topic.hbs');
})});
//Music Reviews thread page
// app.get('/music_reviews.hbs', (request, response) => {
//   response.render('music_reviews.hbs');
// })

//Latest Music thread page
app.get('/latest_music', (request, response) => {

    let db = utils.getDb();
    db.collection('threads').find({Category: 'latest_music'}).toArray(function(err, threads){
        if(err){
            // console.log(err);
            response.send('Unable to retrieve posts');
        }
        else{
            // console.log(threads);
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('latest_music.hbs', {
                        objects: threads,
                        disabled: null
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('latest_music.hbs', {
                    objects: threads,
                    disabled: 'disabled'
                })}
        }
    });
    // response.render('latest_music.hbs');
});


//Create Post Page
app.get('/create_post', (request, response) => {
    response.render('create_post.hbs');
    register.getElements;
});

//Signup Page
app.get('/signup', (request, response) => {
    try {
        if (typeof request.session.email !== "undefined") {
            response.render('signup.hbs', {
                disabled: null
            })
        } else
            throw new Error("User is not signed-in")
    } catch (e) {
        console.log(e.message);
        response.render('signup.hbs', {
            disabled: 'disabled'
        })}

    register.getElements;
});

//Signup Confirmation Page
app.get('/confirmsignup', (request, response) => {
    response.render('confirm.hbs');
});

//Login Page
app.get('/login', (request, response) => {
    try {
        if (typeof request.session.email !== "undefined") {
            response.render('login.hbs', {
                disabled: null
            })
        } else
            throw new Error("User is not signed-in")
    } catch (e) {
        console.log(e.message);
        response.render('login.hbs', {
            disabled: 'disabled'
        })}

});

// app.get('/login2.hbs', (request, response) => {
//     response.render('login2.hbs');
// })
app.get('/login_form', (request, response)=> {
    try {
        if (typeof request.session.email !== "undefined") {
            response.render('login.hbs', {
                disabled: null
            })
        } else
            throw new Error("User is not signed-in")
    } catch (e) {
        console.log(e.message);
        response.render('login.hbs', {
            disabled: 'disabled'
        })}

    // response.redirect('/');
});
//Add user information to database
app.post('/signup_form', (request, response) => {
    var fname = request.body.firstName;
    var lname = request.body.lastName;
    var email = request.body.email;
    var psw = request.body.password;
    var db = utils.getDb();
    var user = db.collection('users');

    // if (
    //     request.body.captcha === undefined ||
    //     request.body.captcha === "" ||
    //     request.body.captcha === null
    // ) {
    //     return response.json({"success": false, "msg": "please select captcha"});
    // }

    // // Secret Key
    // const secretKey = '6LfWI6EUAAAAAEnFDSW9SMUiqH4ns05r_-ZGzNhV';

    // // Verify URL
    // const verifyURL = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${request.body.captcha}
    // &remoteip=${request.connection.remoteAddress}`;

    // Make Request to VerifyURL
    // request(verifyURL, (err, response, body) => {
    //     body = JSON.parse(body);

    //If Not Successful
    // if (body.success !== undefined && !body.success) {
    //     return response.json({"success": false, "msg": "Failed captcha verification"});
    // }
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
    //

    // });
});


//Logs in user if they match information in database
app.post('/login_form', (request, response) => {
    var email = request.body.email;
    var psw = request.body.password;
    var db = utils.getDb();

    // try {
    //     if (typeof request.session.email !== "undefined") {
    //         response.render('login.hbs', {
    //             disabled: null
    //         })
    //     } else
    //         throw new Error("User is not signed-in")
    // } catch (e) {
    //     console.log(e.message);
    //     response.render('login.hbs', {
    //         disabled: 'disabled'
    //     })}

    db.collection('users').findOne({Email: email, Password: psw}).then((doc)=>{
        if(doc == null){
            console.log('Login Failed');
            response.render('login.hbs',{
                login_error:'Incorrect login info...Try Again!!',
                disabled: "disabled"
            })
        }

        else{
            response.cookie('username', doc.First_Name);
            request.session.email = doc.Email;
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


// app.get('/music_reviews', (request, response) => {
//     let db = utils.getDb();
//     db.collection('threads').find({Category: 'music_reviews'}).toArray(function(err, threads){
//         if(err){
//             console.log(err);
//             response.send('Unable to retrieve posts');
//         }
//         else{
//             // console.log(threads);
//             response.render('music_reviews.hbs', {
//                 objects: threads
//             });
//
//         }
//     });
// });

app.get('/sign-out', (req, res) => {
    req.session.destroy(function (err) {

        try {
            console.log(req.session.email)
        }catch(e){
            // let time = new Date().toString();
            // let log = `${time}: ${err} ${req.url}`;
            // fs.appendFile('server.log', log + '\n', (error) => {
                // if (error) {
                    console.log('Unable to log message');
                // }})}
        }

        finally {
            res.redirect('/');
        }

})});



app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
    utils.init();
});

module.exports = app;
