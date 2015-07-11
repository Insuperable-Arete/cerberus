
//node modules
var Twitter = require('twitter');

//local modules
var resources = require('./resources.js');

//util functions
exports.sendDummyData = function(req, res){
	res.json(resources.dummyData);
};



