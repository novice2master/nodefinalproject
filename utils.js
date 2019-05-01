const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://agile:u1wtUop4dTfKLxxo@cluster0-1dr0b.mongodb.net/test?retryWrites=true";

var _db = null;

module.exports.getDb = function() {
    return _db;

};

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if (err)
        return err;

    _db = client.db('muziki');
    console.log('Successfully connected to MongoDB server')
});