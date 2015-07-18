var request = require('request');
var db = require('./db//mongodb-data/config.js');
var Beach = require('./db/models/beach.js');
var spotData = require('./utils/json/beachData.json');
var path = require('path');
var crudUtils = require('./utils/crudUtils.js');

exports.sendSurfSpots = function (req, res) {
  crudUtils.retrieveBeachData(function (data) {
    res.status(200).json(data);
  });
};

exports.sendIndex = function (req, res) {
  res.sendFile(path.join(__dirname, '../client/html/', 'index.html'));
};
