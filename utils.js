const MongoClient = require('mongodb').MongoClient;

var _db = null;

module.exports.getDb = function() {
    return _db;

}

module.exports.init = function(callback) {
    MongoClient.connect('mongodb+srv://agile:u1wtUop4dTfKLxxo@cluster0-1dr0b.mongodb.net/test', function(err, client){
        if(err){
            return console.log('Unable to connect to DB');

        }

        _db = client.db('muziki');
        console.log('Successfully connected to MongoDB server');
    });
};
