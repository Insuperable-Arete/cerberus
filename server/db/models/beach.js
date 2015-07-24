var mongoose = require('mongoose');

//define schema
var beachSchema = mongoose.Schema({
  mswId: { type: Number, required: true, index: {unique: true} },
  beachname: String,
  lat: String,
  lon: String,
  //will reformat forecastData to correct type later
  forecastData: String
});

var Beach = mongoose.model('Beach', beachSchema);

//any methods to attach to data in Surf will be inserted below
//e.g. Surf.doSomethingWithData = function(){...}

module.exports = Beach;


// username: { type: String, required: true, index: { unique: true } },