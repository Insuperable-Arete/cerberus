//node modules
var Twitter = require('twitter');

//local modules
var resources = require('./resources');

//utils
exports.sendDummyData = function(req, res){
	res.send(
		dummydata = {
			beach: 'testBeach',
			id: 123,
			lat: 'testLat',
			lon: 'testLon',
			surfData: {justin: 'fong'}
		}
	)
};



