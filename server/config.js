var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var cors = require("cors");
var morgan = require("morgan");
var cron = require('node-schedule');
var controller = require('./controller.js');
var apiUtils = require('./utils/apiUtils.js');
var crudUtils = require('./utils/crudUtils.js');
var path = require('path');


var app = express();

//middleware
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client'));

//utils to be called on server init
apiUtils.updateBeachData();

app.get('/', controller.sendIndex);
//these routes are for TESTING ONLY
app.get('/fetch', controller.sendSurfSpots);
//populates db with one-time beach data (e.g. lat/long, etc)
app.get('/writeBeachData', crudUtils.beachDataUpdate);
//populates db with msw surf data for respective beach (use for initial/on-demand population)
app.get('/requestBeachData', apiUtils.beachDataReq);

module.exports = app;
