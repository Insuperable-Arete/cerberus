var db = require('../../db/mongodb-data/config.js');
var Beach = require('../../db/models/beach.js');

exports.retrieveBeachData = function (cb) {
  	Beach.find({}, function(err, data){
  		cb(data);
  	})
};


