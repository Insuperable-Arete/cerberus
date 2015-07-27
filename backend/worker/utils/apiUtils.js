var requestPromise = require('request-promise');
var cron = require('node-schedule');
var _ = require('underscore');
var Promise = require('bluebird');
var Twitter = require('twitter');

var spotData = require('./json/beachData.json');
var crudUtils = require('./crudUtils');
var Beach = require('../../db/models/beach.js');

var endpoint = 'http://magicseaweed.com/api/436cadbb6caccea6e366ed1bf3640257/forecast/?spot_id='


//////////working MSW util///////////
///////////
exports.beachDataReq = function(){
  Beach.find({})
    .then(function(data){
      (function recurse(ind){
        if (ind === data.length) return;
        var beach = data[ind];
        var options = {
          method: 'GET',
          uri: endpoint + (beach.mswId).toString()
        }

        requestPromise(options)
          .then(function(response){
            console.log('passed', beach.mswId);
            var timeFiltered = crudUtils.filterBeachDataTime(response);
            Beach.findOneAndUpdate({mswId: beach.mswId, forecastData: timeFiltered})
              .then(function(success){
                console.log('Wrote Beach Data');
                recurse(ind + 1)
              })
              .catch(function(error){
                console.log(error);
                throw error;
              })
            })
      })(0)
    })
};

//////////////////////expeirmental///////
/////////////////
var testRecurse = function(func, time){
  
    Beach.find({})
      .then(function(data){
        function recurse(ind){
          if (ind === data.length) return;
          var beach = data[ind];
          console.log(beach);
          func(beach)
            .then(function(success){
              console.log('Data written!');
              setTimeOut ( function(){recurse(ind+1)}, time )
            })
            .catch(function(error){
              console.log('error');
            })
        }
        recurse(0);
      })
  
};

var getTweet = function(lat, lon, cb){ 

  var client = new Twitter({
   consumer_key: 'o9odfZmdeKbvrgpCVLotcPCNE',
   consumer_secret: 'siz3xPWBJ1iS14KPmSajdIn6DDmHjxHO7vBYr1fIt9E7XvgRrL',
   access_token_key: '874702442-UH5dCPdQ2tyl6NiqbwPFhyzsFNOYbFDdzQiuC0ar',
   access_token_secret: 'QLDf9QCxUzMxD7FkXMkTDKSmM5bB3Fe3ypvbw4Gq1GpAv'
  });

  var geocode = lat + "," + lon + ",5mi";

  client.get('search/tweets', {q: 'surf', geocode: geocode}, function(error, tweets, response){
    cb(error, tweets);
  });
};

var getTweetAsync = Promise.promisify(getTweet);



var getTweetText = function(obj){
  return _.map(obj.statuses, function(tweet){
    return tweet.text;
  })
};

var getTweets = function(beach){
  getTweetAsync(beach.lat, beach.lon)
    .then(function(tweets){
      var tweetText = getTweetText(tweets);
      console.log('reached');
      Beach.findOneAndUpdate({mswId: beach.mswId, tweets: tweetText})
        .then(function(success){
          console.log('Tweet data written!', tweetText);

        })
    })
};


var getTweetsAsync = Promise.promisify(getTweets);
//console.log(getTweetsAsync);
testRecurse(getTweetsAsync, 60100)


/////////////////cron scheduler//////
////////////

exports.updateBeachData = function(){
  var rule = new cron.RecurrenceRule();
  rule.hour = new cron.Range(0, 23, 3);
  cron.scheduleJob(rule, function(){
    exports.beachDataReq();
  });                                               
};


