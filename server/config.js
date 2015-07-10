//node moduels
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');


//local modules
var util = require('./utils.js');


app = express();


//routes
app.get('/', function(req, res){
	console.log('----', req.body);
	res.send('hello world');
});

app.get('/dummy', util.sendDummyData);



module.exports = app;

