var requestPromise = require('request-promise');
var cron = require('node-schedule');
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');
var Beach = require('../../db/models/beach.js');

var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id='

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
              setTimeout ( function(){recurse(ind+1)}, time )
            })
            .catch(function(error){
              console.log(error);
            })
        })(0)
      })
  }
};

exports.getMswAsync = Promise.promisify(function(beach, cb){

  var options = {
    method: 'GET', 
    uri: endpoint + (beach.mswId).toString()
  }

  requestPromise(options)
    .then(function(response){
      //console.log('passed', beach.mswId);
      var timeFiltered = crudUtils.filterBeachDataTime(response);
      Beach.findOneAndUpdate({mswId: beach.mswId, forecastData: timeFiltered})
        .then(function(error, success){
          cb(success, error)
        })
    })
});

var getTweetText = function(obj){
  return _.map(obj.statuses, function(tweet){
    return tweet.text;
  })
};

exports.getTweetAsync = Promise.promisify( function(lat, lon, cb){ 

  var client = new Twitter({
   consumer_key: 'o9odfZmdeKbvrgpCVLotcPCNE',
   consumer_secret: 'siz3xPWBJ1iS14KPmSajdIn6DDmHjxHO7vBYr1fIt9E7XvgRrL',
   access_token_key: '874702442-UH5dCPdQ2tyl6NiqbwPFhyzsFNOYbFDdzQiuC0ar',
   access_token_secret: 'QLDf9QCxUzMxD7FkXMkTDKSmM5bB3Fe3ypvbw4Gq1GpAv'
  });

  var geocode = lat + "," + lon + ",5mi";

  client.get('search/tweets', {q: 'surf', geocode: geocode}, function(error, tweets, response){
    cb(error, tweets, response);
  });

});

var getTweetsAsync = Promise.promisify( function(beach, cb){
  exports.getTweetAsync(beach.lat, beach.lon)
    .then(function(tweets){
      var tweetText = getTweetText(tweets);
      Beach.findOneAndUpdate({mswId: beach.mswId, tweets: tweetText})
        .then(function(error, success){
          console.log('Tweet data written!', tweetText);
          //seems like these two arguments should be swtiched in order
          cb(success, error)
        })
    })
});



exports.getTweetAsync(33.9015, -118.423);
// var testTweet = iterativeApiCall(getTweetsAsync, 60100)
// var testMsw = iterativeApiCall(exports.getMswAsync, 0);
// testMsw();


/////////////////cron scheduler//////
////////////

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.hour = new cron.Range(0, 23, 3);
  cron.scheduleJob(rule, function(){
    exports.beachDataReq();
  });                                               
};


