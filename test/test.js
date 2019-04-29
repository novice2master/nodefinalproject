const assert = require('chai').assert;
// const app = require('../app');
const sayHello = require('../app').sayHello;
describe('App', function () {
    it('app should return hello', function () {
        let result = sayHello();
        assert.equal(result, 'hello');
    })
});