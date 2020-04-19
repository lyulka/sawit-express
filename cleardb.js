var OARBeli = require('./models/oar_beli');

var mongoose = require('mongoose');
var passwords = require('./passwords.json');
var mongoDB = passwords.connectionStringSawit0;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function clearOarbeliCollection() {
    OARBeli.deleteMany({}, (err) => console.log(err));

    console.log("Delete complete.");
}

clearOarbeliCollection();