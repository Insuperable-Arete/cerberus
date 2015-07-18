var request = require('request');
var rp = require('request-promise');
var cron = require('node-schedule');
var _ = require('underscore');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');

var time = 1000;

exports.beachDataReq = function(id){
  var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id=' + id.toString();
  var options = {
    method: 'GET', 
    uri: endpoint
  };

  rp(options)
    .then(function(response){
      console.log('passed: ', id);
      var timeFiltered = crudUtils.filterBeachDataTime(response);
      crudUtils.beachDatumUpdate(id, timeFiltered);
    })
    .catch(function(error){
      console.log(error);
      setTimeout(exports.beachDataReq(id), time+=time);
    });
};

exports.beachDataReqs = function(){
  var ids = spotData.map(function(beachData){
    return beachData.mswId
  });
  _.each(ids, exports.beachDataReq)
};

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.hour = new cron.Range(0, 23, 3);
  cron.scheduleJob(rule, function(){
    exports.beachDataReqs();
  });                                               
};
