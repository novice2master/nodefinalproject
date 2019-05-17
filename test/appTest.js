const request = require('supertest');
const assert = require('chai').assert;
const expect = require('chai').expect;
const lyrics = require('../song_search.js');


var chai = require('chai'), chaiHttp = require('chai-http');

chai.use(chaiHttp);

const app = require('../server');

before(function (done) {
    app.on("appRunning", function(){
        done();
    });
});

function wait(ms){
    var start = new Date().getTime();
    var end = start;
    while(end < start + ms) {
        end = new Date().getTime();
    }
}


describe("POST /song_search", function() {
    let song = {
        "title": "Song 2",
        "artist": "Blur"
    };
    it("when searching for Song 2 by blur gets correct response", function(done) {
        wait(1000);
        chai.request("http://localhost:8080")
            .post("/song_search")
            .send(song)
            .end((err, response) => {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });

    let song2 = {
        "title": "Big Iron",
        "artist": "Marty Robbins"
    };
    it("when searching for Big Iron- Marty Robbins gets correct response", function(done) {
        wait(1000);
        chai.request("http://localhost:8080")
            .post("/song_search")
            .send(song2)
            .end((err, response) => {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
    let song3 = {
        "title": "Watch what I do",
        "artist": "Hey Buko"
    };
    it("when searching for Watch what I do - Hey Buko gets correct response", function(done) {
        wait(1000);
        chai.request("http://localhost:8080")
            .post("/song_search")
            .send(song3)
            .end((err, response) => {
                expect(response).to.have.status(400);
                if (err) return done(err);
            });
        done()
    });
});



describe("POST /addComment", function() {
    let comment = {
        "email": "joakinsonyango05@gmail.com",
        "comment": "noothing lol"
    };
    it("comment added", function(done) {
        wait(1000);
        chai.request("http://localhost:8080")
            .post("/addComment")
            .send(comment)
            .end((err, response) => {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});

describe("GET /account", function() {
    this.timeout(5000);
    it("account page found", function(done) {
        wait(1000);
        chai.request.agent("http://localhost:8080")
            .get("/account")
            .end((err, response) => {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});

describe('POST /signup', function () {
    let data = {
        "First_Name": "Reginald",
        "Last_Name": "Mengi",
        "Email": "jmengi@lol.ke",
        "Password": "RegMengi12"
    };
    it("Account created", function (done) {
        wait(1000);
        chai.request("http://localhost:8080")
            .post('/signup_form')
            .send(data)
            .end((err, response) => {
                expect(response).to.have.status(200);
                expect('Location', '/confirmsignup');
                if (err) return done(err);
                
            });
        done()
        
    });
});


const data = {
        "Email": "jmengi@lol.ke",
        "Password": "RegMengi123"
    };
before(function(done){
      request.agent(app)
        .post('/login')
        .send(data)
        .end(function(err){
          expect('Location', '/');
          if (err) return done(err);
          done();
        });
});
describe('POST /login', function () {
    it("Login successful", function (done) {
        wait(1000);
        request.agent("http://localhost:8080").post('/login')
        .expect(200);
        done();
  });
});



describe('GET /create_post', function () {
    this.timeout(5000);
    it("Create test page", function (done) {
        wait(1000);
        chai.request.agent("http://localhost:8080")
            .get('/create_post')
            .end(function(err, response) {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});

describe('GET /', function () {
    this.timeout(5000);
    it("Main page test", function (done) {
        wait(1000);
        chai.request(app)
            .get('/')
            .end(function(err, response) {
                expect(response).to.have.status(200);
                if (err) return done(err);
                
            });
        done()
    });
});



describe('GET /general_music', function () {
    this.timeout(5000);
    it("General Music test page", function (done) {
        wait(1000);
        chai.request("http://localhost:8080")
            .get('/general_music')
            .end(function(err, response) {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});

describe('GET /signup', function () {
    this.timeout(5000);
    it("Sign up test page", function (done) {
        wait(1000);
        chai.request(app)
            .get('/signup')
            .end(function(err, response) {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});




describe('GET /confirmsignup', function () {
    this.timeout(5000);
    it("confirm page test", function (done) {
        wait(1000);
        chai.request(app)
            .get('/confirmsignup')
            .end(function(err, response) {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});

describe('GET /login', function () {
    this.timeout(5000);
    it("Login test page", function (done) {
        wait(1000);
        chai.request(app)
            .get('/login')
            .end(function(err, response) {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});


describe('GET /latest_music', function () {
    this.timeout(5000);
    it("Latest Music page test", function (done) {
        wait(1000);
        chai.request.agent("http://localhost:8080")
            .get('/latest_music')
            .end(function(err, response) {
                expect(response).to.have.status(200);
                if (err) return done(err);
            });
        done()
    });
});

describe('POST /thread_form', function () {
    this.timeout(5000);
    let data = {
        "Email": "jmengi@lol.ke",
        "Title": "Music",
        "Message": "Music today is lit",
        "Category": "General Music"
    };
    it("Thread posted", function (done) {
        wait(1000);
        chai.request(app)
            .post('/thread_form')
            .send(data)
            .end((err, response) => {
                if (err) return done(err);
                expect(response).to.have.status(200)
            });
        done()
    });
});

