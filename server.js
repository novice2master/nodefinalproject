const express = require('express');
const hbs = require('hbs');
const register = require('./register.js');


var app = express();

app.use(express.static(__dirname, + '/public/'));
hbs.registerPartials(__dirname + '/views/partials/');

app.set('view engine', 'hbs');

app.get('/', (request, response) => {
    response.render('index.hbs');
})

app.get('/login.hbs', (request, response) => {
    response.render('login.hbs');
})

app.post('/signup_form')

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