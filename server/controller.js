var request = require('request');
var testData = require('./utils/testData.js');
var db = require('./db//mongodb-data/config.js');
var Beach = require('./db/models/beach.js');
var spotData = require('./utils/spotIdToName.json');

module.exports = {

  sendDbData: function (req, res) {
  	Beach.find({}, function(err, data){
  		res.send(data);
  	})
  },

  createEntry: function(req, res, data){
  	var newBeach = Beach({
			mswId: data.mswId,
			beachname: data.beachname,
			lat: 'PLACEHOLDER',
			lon: 'PLACEHOLDER',
			forecastData: testData.dummyData
		});

		newBeach.save(function(err){
			if (err) throw err;
			console.log('Beach Entry Created!')
		});
  },

  populate: function(req, res){


  	var keys = Object.keys(spotData);

  	var beachDataObj = {};
  	var beachDataArr = [];
  	//the below loop will be modified to deal with additional info (i.e. lat/lon, etc)
  	for (var i=0; i<keys.length; i++){
  		beachDataObj[i] =  {mswId: keys[i], beachname: spotData[keys[i]]};
  		beachDataArr[i] = {mswId: keys[i], beachname: spotData[keys[i]]};
  	}

  	for (var i=0; i<beachDataArr.length; i++){
  		module.exports.createEntry(req, res, beachDataArr[i]);
  	}

  },



  mswRequest: function(req, res){
  	var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf364025779b64e18/forecast/?spot_id=10'
  	request
  		.get(endpoint)
  		.on('error', function(err){
  			console.log(err);
  		})
  		.on('response', function(response){
  			console.log(response.statusCode);
  		})
  }


}

