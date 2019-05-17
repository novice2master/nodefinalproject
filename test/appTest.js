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

// describe("POST /thread_form", function (done) {
//     let data = {
//         "_method": "post",
//         "First_Name": "John",
//         "Last_Name": "Mengi",
//         "Email": "jmengi@lol.ke",
//         "Password": "RegMengi123"
//     };
//     chai.request(app)
//         .post('/thread_form')
//         .type('form')
//         .timeout(1000)
//         .send(data)
//
//         .end(function (err, res) {
//             console.log(res);
//             expect(err).to.be.null;
//             expect(res).to.have.status(200);
//             done()
//         })
//     });

// describe("POST","/addComment", function(done){
//
// });
describe("Song search function working", function () {
    it("when searching for Song 2 by blur gets correct response", function (done) {
        lyrics("Song 2", "Blur").then(res=> {
            assert.equal(res.title,"Song 2");
            assert.equal(res.artist,"Blur");
            expect(res.lyric).to.be.a('string');
            done()
        }).catch(err=> {
            expect(err).not.to.be.a("No lyrics found")
        })
    });
    it("when searching for Big Iron- Marty Robbins gets correct response", function (done) {
        lyrics("Big Iron", "Marty Robbins").then(res=> {
            assert.equal(res.title,"Big Iron");
            assert.equal(res.artist,"Marty Robbins");
            expect(res.lyric).to.be.a('string');
            done()
        }).catch(err=> {
            expect(err).not.to.be.a("No lyrics found")
        })
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
            })
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
    it("Account exists", function (done) {
        wait(1000);
        request.agent("http://localhost:8080").post('/login')
        .expect(200);
        done();
  });
});



describe('GET /create_post', function () {
    this.timeout(5000);
    it("Create Post test", function (done) {
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
                
            })
        done()
    });
});



describe('GET /general_music', function () {
    this.timeout(5000);
    it("General Music test", function (done) {
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
    it("Sign up test", function (done) {
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
    it("Main page test", function (done) {
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
    }
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

