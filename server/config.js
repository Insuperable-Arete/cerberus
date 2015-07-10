var express = require('express');
var bodyParser = require('body-parser');
var Twitter = require('twitter');
var util = require('./utils.js');
var everyauth = require('everyauth');
var request = require('request');


app = express();

everyauth.helpExpress(app);

//app.use(bodyParser.json());

//routes

request({
	uri: 'http://graph.facebook.com/endpoint?key=value&access_token=app_id|app_secret',
	method: 'GET',
	body: {
		code: param,
		'app_id': '1588095601452484',
		'app_secret': '87e7379e401ee2b7a1c02979f9e30e5f'
	},
	function(error, response, body){
		if (error){
			return console.error('error: ', error)
		}
		console.log('success');
	};

})

app.get('/', function(req, res){
	console.log('----', req.body);
	res.send('hello world');
});

app.get('/tweet', util.getTwitterData);

app.get('/facebook', function(req, res){
	console.log('hello world');
});







module.exports = app;

