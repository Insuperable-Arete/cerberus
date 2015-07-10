var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var util = require('./utils.js');


var app = express();

app.use(bodyParser.json());



app.get('/', util.getTwitterData);





module.exports = app;

