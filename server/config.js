var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var controller = require('./controller.js');
var cors = require("cors");
var morgan = require("morgan");

var app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());


//these routes are for TESTING ONLY
//need to 
//controller.createEntry();



app.get('/dbTestPopulate', controller.populate);
app.get('/testRequest', controller.mswRequest);

module.exports = app;
