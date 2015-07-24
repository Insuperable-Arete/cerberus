var testData = require('./utils/testData.js');
var db = require('./db//mongodb-data/config.js');
var Beach = require('./db/models/beach.js');
var spotData = require('./utils/spotIdToName.json');

module.exports = {

  sendDummyData: function (req, res) {
  	res.json(testData.dummyData);
  },

  createEntry: function(req, res, data){
  	var newBeach = Beach({
			mswId: data.mswId,
			beachname: data.beachname,
			lat: 'PLACEHOLDER',
			lon: 'PLACEHOLDER',
			forecastData: 'PLACEHOLDER'
		});

		newBeach.save(function(err){
			if (err) throw err;
			console.log('Beach Entry Created!')
			res.send('Beach Entry Created')
		});
  },

  populate: function(req, res){
  	var keys = Object.keys(spotData);

  	var beachDataObj = {};
  	var beachDataArr = [];

  	//for now creating an object for easier look up (mswId or beachname for keys?)
  	//creating array for easier one-time pop of db

  	for (var i=0; i<keys.length; i++){
  		beachDataObj[i] =  {mswId: keys[i], beachname: spotData[keys[i]]};
  		beachDataArr[i] = {mswId: keys[i], beachname: spotData[keys[i]]};
  	}

  	for (var i=0; i<beachDataArr.length; i++){
  		module.exports.createEntry(req, res, beachDataArr[i]);
  	}

  },
 

  //retrieveDB will eventually retrieve dynamically from util and/or arguments
	//for now hard coded retrieve is used for testing (ideally would be pulling data from testData.js)
  retrieve: function(req, res){
  	Beach.find({}, function(err, data){
  		console.log(data);
  		res.send(data);
  	})
  }


}
