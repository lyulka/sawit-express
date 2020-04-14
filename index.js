var express = require('express');
var path = require('path');

var oarbeliRouter = require('./routes/oar_beli')
var oarlabRouter = require('./routes/oar_lab');
var olahRouter = require('./routes/olah');

// Get passwords
var passwords = require('./passwords.json');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = passwords.connectionStringSawit0;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind); // binds the error event.

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Serve the client
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

// Routers for api calls
app.use('/api/OARBeli', oarbeliRouter);
app.use('/api/OARLab', oarlabRouter);
app.use('/api/Olah', olahRouter);

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port' + port);