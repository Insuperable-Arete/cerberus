var express = require('express');
var bodyParser = require('body-parser');
var controller = require('./controller.js');



var app = express();

app.use(bodyParser.json());


//these routes are for TESTING ONLY 
app.get('/dummy', controller.sendDummyData);


app.get('/dbRetrieve', controller.retrieve);
app.get('/dbTestPopulate', controller.populate);

module.exports = app;

