var express = require('express');
var cron = require('node-schedule');

var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');
var data = require('./utils/json/beachData.json');

var app = express();

crudUtils.writeBeachEntries(data);

//enable the below function if you want tweets to popualte
//apiUtils.tweetData();

//enable the below function if you want interval surf data updates
apiUtils.mswData();

//enable the below function if you to populate DB with scraped descriptions
//apiUtils.mswDescriptions();


//app.get('/requestBeachData', apiUtils.beachDataReq);

module.exports = app;
