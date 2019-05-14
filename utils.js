const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://agile:u1wtUop4dTfKLxxo@cluster0-1dr0b.mongodb.net/test?retryWrites=true";
var _db = null;

module.exports.getDb = function() {
    return _db;

};

module.exports.getObjectId = () => {
    return require('mongodb').ObjectID;
};

module.exports.init = function(callback) {
    return new Promise(((resolve, reject) => {
        const client = new MongoClient(uri, { useNewUrlParser: true });
        client.connect(err => {
            if (err)
                reject(err);
                // return err;

            _db = client.db('muziki');
            resolve(_db);
            console.log('Successfully connected to MongoDB server')
        });
        }))
};
