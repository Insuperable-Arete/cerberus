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
			res.send('Beach Entry Created')
		});
  },

  populate: function(req, res){

  	//function populates, but throws error in console : (bottom of page)



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
// http://magicseaweed.com/api/YOURAPIKEY/forecast/?spot_id=10
// http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf364025779b64e18/forecast/?spot_id=10

}


/*
  	/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/mpromise/lib/promise.js:108
  if (this.ended && !this.hasRejectListeners()) throw reason;
                                                      ^
Error: Can't set headers after they are sent.
    at ServerResponse.OutgoingMessage.setHeader (_http_outgoing.js:335:11)
    at ServerResponse.header (/Users/James/Documents/thesis/cerberus/node_modules/express/lib/response.js:718:10)
    at ServerResponse.send (/Users/James/Documents/thesis/cerberus/node_modules/express/lib/response.js:163:12)
    at EventEmitter.<anonymous> (/Users/James/Documents/thesis/cerberus/server/controller.js:27:8)
    at EventEmitter.<anonymous> (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/mpromise/lib/promise.js:175:45)
    at EventEmitter.emit (events.js:110:17)
    at Promise.safeEmit (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/mpromise/lib/promise.js:81:21)
    at Promise.fulfill (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/mpromise/lib/promise.js:94:24)
    at Promise.resolve (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/lib/promise.js:113:23)
    at model.<anonymous> (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/lib/document.js:1578:39)
    at next_ (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/hooks-fixed/hooks.js:89:34)
    at EventEmitter.fnWrapper (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/hooks-fixed/hooks.js:171:15)
    at EventEmitter.<anonymous> (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/mpromise/lib/promise.js:175:45)
    at EventEmitter.emit (events.js:110:17)
    at Promise.safeEmit (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/mpromise/lib/promise.js:81:21)
    at Promise.fulfill (/Users/James/Documents/thesis/cerberus/node_modules/mongoose/node_modules/mpromise/lib/promise.js:94:24)
  	var keys = Object.keys(spotData);

  	var beachDataObj = {};
  	var beachDataArr = [];

  	//for now creating an object for easier look up (mswId or beachname for keys?)
  	//creating array for easier one-time pop of db
*/
