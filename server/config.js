var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cors = require("cors");
var morgan = require("morgan");
var cron = require('node-schedule');

var controller = require('./controller.js');
var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');

var app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

//utils to be called on server init
apiUtils.updateBeachData();

//these routes are for TESTING ONLY
//populates db with one-time beach data (e.g. lat/long, etc)
app.get('/writeBeachEntries', crudUtils.writeBeachEntries);
//populates db with msw surf data for respective beach
app.get('/beachDataRequests', apiUtils.beachDataReqs);

//these routes are for serving static assets
app.get('/', controller.serveDummyRoot)
//fill in route to serve down beach data (controller.js -->) 

module.exports = app;

