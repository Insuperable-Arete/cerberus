var request = require('request');
var rp = require('request-promise');
var cron = require('node-schedule');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');

exports.beachDataReq = function(id, cb){
  var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id.toString();
  var options = {
    method: 'GET', 
    uri: endpoint
  };

  rp(options)
  //this idealy should not be a callback...should chain in promise format
    .then(function(data){
      console.log('passed: ', id);
      cb(data)
    })
    .catch(function(){
      console.log('failed: ', id)
    })
};

exports.beachDataReqs = function(){   
  //i'm pretty sure we don't need the setTimeout...this is very messy right now :(
  spotData.forEach(function(ids){
    var id = ids.mswId;
    exports.beachDataReq(id, function(surfData){
      var timeFiltered = crudUtils.filterBeachDataTime(surfData);
      crudUtils.beachDatumUpdate(id, timeFiltered);
    })
  })
};

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  //this can be shortened into a range of hours
  rule.hour = [0,3,6,9,12,15,18,21,24];
  cron.scheduleJob(rule, function(){
    exports.beachDataReqs();
  });                                               
};
