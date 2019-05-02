const assert = require('chai').assert;
const sayHello = require('../app').sayHello;
const addNumbers = require('../app').addNumbers;
const app =require('../server');
// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
// const app = require('../server');
// Configure chai
chai.use(chaiHttp);
chai.should();

describe("Threads", () => {
    describe("GET /", () => {
        // me test
        // it("should get all threads", (done) => {
        //     chai.request(app)
        //         .get('/general_music.hbs')
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             res.body.should.be.a('object');
        //             done();
        //         });
        // });
        // // Test to get all students record
        it("Home page should load", (done) => {
             chai.request(app);
                 console.log(app)
                 .get('/')
                 .end((err, res) => {
                     console.log(res);
                     res.should.have.status(200);
                     // res.body.should.be.a('object');
                     done();
                  });
         });
        // // Test to get single student record
        // it("should get a single student record", (done) => {
        //      const id = 1;
        //      chai.request(app)
        //          .get(`/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(200);
        //              res.body.should.be.a('object');
        //              done();
        //           });
        //  });
        //
        // // Test to get single student record
        // it("should not get a single student record", (done) => {
        //      const id = 5;
        //      chai.request(app)
        //          .get(`/${id}`)
        //          .end((err, res) => {
        //              res.should.have.status(404);
        //              done();
        //           });
        //  });
    });
});
//
// sayHelloResult = app.sayHello();
// addNumbersResult = app.addNumbers(5, 5);

describe('App', function () {
    // describe('sayHello()', function () {
    //
    //     it('sayHello should return hello', function () {
    //         // let result = app.sayHello();
    //         assert.equal(sayHelloResult, 'hello');
    //     });
    //
    //     it('sayHello should return type string', function () {
    //         // let result = app.sayHello();
    //         assert.typeOf(sayHelloResult, 'string');
    //     });
    // });


    describe('addNumbers()', function () {

        it('addNumbers should be above 5', function () {
            // let result = app.addNumbers(5,5);
            let addNumbersResult = app.addNumbers(5,5);
            assert.isAbove(addNumbersResult, 5);
        });

        it('addNumbers should return type number', function () {
            // let result = app.addNumbers(5,5);
            let addNumbersResult = app.addNumbers(5,5);
            assert.typeOf(addNumbersResult, 'number');
        });
    });
});




