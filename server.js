const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const MongoClient = require('mongodb').MongoClient;
const utils = require('./utils');
const port = process.env.PORT || 8080;
const session = require('express-session');
const captchapng = require('captchapng');
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

const getVcodeImage = (req, res) => {
    const vcode = parseInt(Math.random() * 9000 + 1000); //Generate random numbers

    // Store the randomly generated verification code in the session
    req.session.vcode = vcode;

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer.from(img, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    res.end(imgbase64);
};

app.get('/vcode',getVcodeImage);

//Homepage
app.get('/', (request, response) => {
    //checks if the user is signed in, if so displays renders a page that is useful to the user
        try {
            if (typeof request.session.email !== "undefined") {
                response.render('index.hbs', {
                        disabled: null,
                        loggedin: "True",
                        email: request.session.email
                    })
            } else
                throw new Error("User is not signed-in")
        } catch (e) {
            console.log(e.message);
            response.render('index.hbs', {
                disabled: 'disabled',
                loggedin: "False"
            })
    }});


//General Music thread page
app.get('/general_music', async (request, response) => {
    //retrives data from the databse and sends back genderal_music dicussion posts
    let db = await utils.getDb();
    db.collection('threads').find({Category: 'general_music_discussion'}).toArray(function (err, threads) {
        if (err) {
            console.log(err);
            response.send('Unable to retrieve posts');
        } else {
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('general_music.hbs', {
                        objects: threads,
                        disabled: null,
                        loggedin: "True",
                        email: request.session.email
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('general_music.hbs', {
                    objects: threads,
                    disabled: 'disabled',
                    loggedin: "False"
                })
            }
        }
    });

});


app.get('/all_posts', async (request, response) => {
//retrives data from the databse and sends back all posts

    let db = await utils.getDb();
    db.collection('threads').find({}).toArray(function (err, threads) {
        if (err) {
            console.log(err);
            response.send('Unable to retrieve posts');
        } else {
            // console.log(threads);
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('all_posts.hbs', {
                        objects: threads,
                        disabled: null,
                        loggedin: "True",
                        email: request.session.email
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('all_posts.hbs', {
                    objects: threads,
                    disabled: 'disabled',
                    loggedin: "False"
                })
            }
        }
    });
});

app.get('/off_topic', async (request, response) => {
//retrives data from the databse and sends back off topic disucssion posts
    let db = await utils.getDb();
    db.collection('threads').find({Category: 'off_topic_discussion'}).toArray(function (err, threads) {
        if (err) {
            console.log(err);
            response.send('Unable to retrieve posts');
        } else {
            // console.log(threads);
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('off_topic.hbs', {
                        objects: threads,
                        disabled: null,
                        loggedin: "True",
                        email: request.session.email
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('off_topic.hbs', {
                    objects: threads,
                    disabled: 'disabled',
                    loggedin: "False"
                })
            }
        }
    })
});
//personal account page
app.get('/account', async (request, response) => {
    // if users ins't loggedin, they aren't allowed to the page
    try {
        if (typeof request.session.email !== 'string'){
            response.redirect("/");
            return
        }
    }catch (e) {
        console.log("User Forbidden")
    }
    let db = await utils.getDb();
    //retrives data from the database with posts that the users posted
    db.collection('threads').find({Email: request.session.email}).toArray(function (err, threads) {
        if (err) {
            console.log(err);
            response.send('Unable to retrieve posts');
        } else {
            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('account.hbs', {
                        objects: threads,
                        disabled: null,
                        loggedin: "True",
                        email: request.session.email
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('account.hbs', {
                    objects: threads,
                    disabled: 'disabled',
                    loggedin: "False",
                    email: null
                })
            }


        }

    })
});

        // response.render('off_topic.hbs');
    // })});


app.get('/chatroom', (request, response) => {
    response.render('chatroom.hbs')
});
//Music Reviews thread page
// app.get('/music_reviews.hbs', (request, response) => {
//   response.render('music_reviews.hbs');
// })

//Latest Music thread page
app.get('/latest_music', async (request, response) => {
    //retrives data from the database with latest music posts 
    let db = await utils.getDb();
    db.collection('threads').find({Category: 'latest_music'}).toArray(function (err, threads) {
        if (err) {
            // console.log(err);
            response.send('Unable to retrieve posts');

        } else {

            try {
                if (typeof request.session.email !== "undefined") {
                    response.render('latest_music.hbs', {
                        objects: threads,
                        disabled: null,
                        loggedin: "True",
                        email: request.session.email
                    })
                } else
                    throw new Error("User is not signed-in")
            } catch (e) {
                console.log(e.message);
                response.render('latest_music.hbs', {
                    objects: threads,
                    disabled: 'disabled',
                    loggedin: "False"
                })
            }
        }
    });
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
                disabled: null,
                loggedin: "True",
                email: request.session.email
            })
        } else
            throw new Error("User is not signed-in")
    } catch (e) {
        console.log(e.message);
        response.render('signup.hbs', {
            disabled: 'disabled',
            loggedin: "False"
        })}

    register.getElements;
});

//Signup Confirmation Page
app.get('/confirmsignup', (request, response) => {
    response.render('confirm.hbs');
});

//Login Page
app.get('/login', (request, response) => {
    if (typeof request.session.email !== "undefined") {
        console.log('logintest');
        response.render('login.hbs', {
            disabled: null,
            loggedin: "True",
            email: request.session.email
        })
    } else {
        response.render('login.hbs', {
            disabled: 'disabled'
        })
    }
});

//login user based if able to location user info from DB
app.get('/login_form', (request, response)=> {
    try {

        if (typeof request.session.email !== "undefined") {
            console.log('undefined');
            response.render('login.hbs', {
                disabled: null,
                loggedin: "True",
                email: request.session.email
            })
        } else {

            throw new Error("User is not signed-in")
        }
    } catch (e) {
        console.log(e.message);
        response.render('login.hbs', {
            disabled: 'disabled',
            loggedin: "False"
        })
    }
});

//Add user information to database
app.post('/signup_form', async (request, response) => {
    var fname = request.body.firstName;
    var lname = request.body.lastName;
    var email = request.body.email;
    var psw = request.body.password;
    let db = await utils.getDb();
    var user = db.collection('users');


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

//Logs in user if they match information in database

app.post('/login_form', async (request, response) => {

    if (request.body.vcode != request.session.vcode) {
        response.render('login.hbs', {
            disabled: 'disabled',
            login_error: 'Incorrect captcha',
        });
        return;
    }

    var email = request.body.email;
    console.log(email);
    var password = request.body.password;
    console.log(password);
    var db = utils.getDb();


    db.collection('users').findOne({Email: email, Password: password}).then((doc) => {
    if (doc == null) {
        console.log('Login Failed');
        response.render('login.hbs', {
            login_error: 'Incorrect login info...Try Again!!',
            disabled: "disabled",
            loggedin: "False"
        })
    } else {
        response.cookie('username', doc.First_Name);
        request.session.email = doc.Email;
        response.redirect('/');
    }

            })
    });


//Enters a thread in a database
app.post('/thread_form', async (request, response) => {
    var email = request.session.email;
    var title = request.body.title;
    var message = request.body.message;
    var category = request.body.categories;

    let db = await utils.getDb();

    db.collection('threads').insertOne({
        Email: email,
        Title: title,
        Message: message,
        Category: category
    }, (err) => {
        if (err) {
            response.send('Unable to add user.');
        }
        response.redirect(request.get('referer'));
        // response.render('postconfirm.hbs');
    })
});

app.get('/thread', (request, response) => {
    if (typeof request.session.email !== "undefined") {
        console.log('threadtest');
        response.render('create_post.hbs', {
            disabled: null,
            loggedin: "True",
            email: request.session.email
        })
    } else {
        response.render('create_post.hbs', {
            disabled: 'disabled',
            loggedin: "False"
        })
    }
});


app.get('/sign-out', (req, res) => {
    req.session.destroy(function (err) {

        try {
            console.log(req.session.email)
        }catch(e){

                    console.log('Unable to log message');
        }

        finally {
            res.redirect('/');
        }
    })
});


app.listen(port, () => {
    utils.init();
    console.log(`Server is up on port ${port}`);

});

module.exports = app;
