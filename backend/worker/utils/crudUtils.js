var _ = require('underscore');

var db = require('../../db/mongodb-data/config.js');
var Beach = require('../../db/models/beach.js');
var apiUtils = require('./apiUtils.js');
var spotData = require('./json/beachData.json');

var writeBeachEntry = function(beachData){
	Beach.find({mswId: beachData.mswId})
		.then(function(beach){
			if (beach.length === 0){
				var newBeach = Beach({
					mswId: beachData.mswId,
					beachname: beachData.beachName,
					lat: beachData.lat,
					lon: beachData.lon,
					forecastData: ['test']
				})

				newBeach.save(function(err){
					if (err) throw err;
					//console.log('Beach Entry Created!')
				});
			}
			//else console.log('Beach Entry Exists!');
		})
};

exports.writeBeachEntries = function(){
	_.each(spotData, function(spotDatum){
		writeBeachEntry(spotDatum)
	})
};

exports.retrieveBeachData = function (cb) {
  Beach.find({})
  	.then(function(data){
  		cb(data);
  	})
};

exports.filterBeachDataTime = function(data){
	var parsedData = JSON.parse(data);
	var time = Math.floor( (Date.now()/1000) );
	return _.filter(parsedData, function(datum){
		return datum.localTimestamp > time && datum.localTimestamp < (time + 86402);
	});
};