var requestPromise = require('request-promise');
var request = require('request');
var cron = require('node-schedule');
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');
var cheerio = require('cheerio');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');
var Beach = require('../../db/models/beach.js');

//promisified utility which requests surf data from the Magic Seaweed API
var getMswAsync = Promise.promisify (function(beach, cb){
    var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id='
    var options = {
      method: 'GET', 
      uri: endpoint + (beach.mswId).toString()
    }

    requestPromise(options)
      .then(function(response){
        return crudUtils.filterBeachDataTime(response)
      })
      .then(function(filtered){
        console.log(filtered);
        return Beach.findOneAndUpdate({mswId: beach.mswId, forecastData: filtered})
      })
      .then(function(err, success){
        cb(success, err)
      })
      .catch(function(err){
        console.log(err)
      })
});

var iterativeApiCall = function(func, time){
  return function(){
    Beach.find({})
      .then(function(data){
        (function recurse(ind){
          if (ind === data.length){
            console.log('Data for all beaches finished')
            return;
          } 
          func(data[ind])
            .then(function(success){
              console.log('util run');
              setTimeout ( function(){recurse(ind+1)}, time )
            })
            .catch(function(error){
              console.log(error);
              //setTimeout ( function(){recurse(ind+1)}, time )
            })
        })(0)
      })
  }
};

var getMswDescriptionAsync = Promise.promisify (function(beach, cb){
  var url = 'http://magicseaweed.com/Playa-Linda-Surf-Guide/' + (beach.mswId).toString();
  requestPromise(url)
    .then(function(html){
      var $ = cheerio.load(html);
      return $('.msw-s-desc').text();
    })
    .then(function(description){
      console.log(beach.mswId);
      return Beach.findOneAndUpdate({mswId: beach.mswId, description: description})
    })
    .then(function(err, success){
      cb(success, err);
    })
    .catch(function(err){
      console.log(err);
    })
});



exports.mswDescriptions = iterativeApiCall(getMswDescriptionAsync, 0);
exports.mswData = iterativeApiCall(getMswAsync, 0);
exports.tweetData = iterativeApiCall(getTweetsAsync, 60100);

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.hour = new cron.Range(0, 23, 3);
  cron.scheduleJob(rule, function(){
    exports.beachDataReq();
  });                                               
};
