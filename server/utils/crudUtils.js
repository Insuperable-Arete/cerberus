var _ = require('underscore');

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
			forecastData: ['justin f puts the lotion on its skin']
		});

		newBeach.save(function(err){
				if (err) throw err;
				console.log('Beach Entry Created!')
			});
};

exports.beachDataUpdate = function(){
	_.each(spotData, function(spotDatum){
		exports.writeBeachEntry(spotDatum)
	})
};

exports.beachDatumUpdate = function(id, data){
  Beach.findOneAndUpdate({mswId: id}, {forecastData: data}, function(err, beach){
    if (err) throw err;
    else console.log('Wrote beach data');
  })
};


// exports.retrieveBeachData = function (cb) {
//   	Beach.find({}, function(err, data){
//   		cb(data);
//   	})
// };

exports.retrieveAllBeachData = function (cb) {
  Beach.find({})
  	.then(function(data){
  		cb(data);
  	})
};

//this can be refactored to use a mongo-native util
exports.filterBeachDataTime = function(data){
	var parsedData = JSON.parse(data);
	var time = Math.floor( (Date.now()/1000) );
	return _.filter(parsedData, function(datum){
		return datum.timestamp > time && datum.timestamp < (time + 86402);
	});
};
