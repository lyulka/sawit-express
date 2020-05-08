var express = require('express');
var path = require('path');
var cors = require('cors');
var bodyParser = require('body-parser');
require('dotenv').config();

var oarbeliRouter = require('./routes/oar_beli')
var oarlabRouter = require('./routes/oar_lab');
var olahRouter = require('./routes/olah');

var app = express();

// Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = process.env.CONNECTION_STRING;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
var db = mongoose.connection;
db.on('error', console.error.bind); // binds the error event.

// Handles post requests
app.use(bodyParser.json());

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Routers for api calls
app.use('/api/OARBeli', cors(), oarbeliRouter);
// app.use('/api/OARLab', oarlabRouter);
// app.use('/api/Olah', olahRouter);

// Serve the client
app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log('App is listening on port' + port);