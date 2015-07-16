var request = require('request');
var cron = require('node-schedule');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');

exports.beachDataReq = function(id, cb){
	var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id.toString();
	request({
    method: 'GET',
    uri: endpoint
  }, 
  function (error, response, body){
    if (error){
      return console.log('request failed: ', error);
    }
    cb(body);
  })
};

//needs to be MAJORLY refactored...callback hell :(
exports.beachDataReqs = function() {   
  spotData.forEach(function(ids) {
    var id = ids.mswId;
    exports.beachDataReq(id, function(surfData) {
      crudUtils.beachDataUpdate(id, surfData);
    });
  });
};

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.minute = 30;
  cron.scheduleJob(rule, function(){
    console.log('cron job run...');
    //will eventually be...
    // "export.beachDataRequests"
  });                                               
};
