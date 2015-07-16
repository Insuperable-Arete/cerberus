var db = require('../db/mongodb-data/config.js');
var Beach = require('../db/models/beach.js');
var apiUtils = require('./apiUtils.js');
var spotData = require('./json/beachData.json');

exports.writeBeachEntry = function(beachData){
	var newBeach = Beach({
		mswId: beachData.mswId,
		beachname: beachData.beachName,
		lat: beachData.lat,
		lon: beachData.lon,
		forecastData: ['test']
	});

	newBeach.save(function(err){
		if (err) throw err;
		console.log('Beach Entry Created!');
	});
};

exports.writeBeachEntries = function(){
	spotData.forEach(function(spotData){
		exports.writeBeachEntry(spotData)
	})
};


exports.beachDataUpdate = function(id, data){
  Beach.findOneAndUpdate({mswId: id}, {forecastData: data}, function(err, beach){
    if (err) throw err;
  })
};

exports.retrieveAllBeachData = function (cb) {
	Beach.find({}, function(err, data){
		cb(data);
	})
};
