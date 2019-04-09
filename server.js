const express = require('express');
const hbs = require('html');
const fs = require('fs')

var app = express();

const port = process.env.PORT || 8080;


app.use((request, response, next) => {
	var time = new Date().toString();
	// console.log(`${time}: ${request.method} ${request.url}`);
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '/n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});
	next();
});


app.get('/', (request, response) => {
	// response.send('<h1>Hello Heroku!</h1>')
	response.send('home.html')
	// response.send({
	// 	name: 'Your Name',
	// 	school: [
	// 	'BCIT',
	// 	'SFU',
	// 	'UBC']
	// })
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	});
})

app.get('/info', (request, response) => {
	// response.send('My info page');
	response.render('about.hbs', {
		title: 'About page',
		// year: new Date().getFullYear(),
		welcome: 'Hello!'
	})
})

app.listen(port, () => {
	console.log(`Server is up on the port ${port}`);
});