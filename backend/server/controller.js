var request = require('request');
var db = require('../db/mongodb-data/config.js');
var Beach = require('../db/models/beach.js');
var path = require('path');
var crudUtils = require('./utils/crudUtils.js');

exports.sendIndex = function (req, res) {
 res.sendFile(path.join(__dirname, '../../client/html/', 'index.html'));
};

exports.sendSurfSpots = function (req, res) {
  crudUtils.retrieveBeachData(function (data) {
    res.send(data);
  });
};
