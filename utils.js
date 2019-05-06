const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://agile:u1wtUop4dTfKLxxo@cluster0-1dr0b.mongodb.net/test?retryWrites=true";

var _db = null;

function connect() {

    return new Promise((resolve, reject) => {

        if (process.env.Node_)
        MongoClient.connect(uri,
            { useNewUrlParser: true, useCreateIndex: true })
            .then((response, err) => {
                if (err) return reject(err);
                resolve();
            })
        })
}

const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
    if (err)
        return err;

    _db = client.db('muziki');
    console.log('Successfully connected to MongoDB server')
});

module.exports.getDb = function() {
    return _db;

};