var rp = require('request-promise');
var request = require('request');

var GOOGLE_API_KEY = 'AIzaSyBC06eN-cRmBqhorIpROXV9s-TvcIckzQA';
var address = 'Mavericks Half Moon Bay California Beach';
var options = {
  uri: 'https://maps.googleapis.com/maps/api/geocode/json',
  qs: {
    key: GOOGLE_API_KEY,
    address: address
  }
};

// parse spotIdToName 
// map it to an array of objects formatted with mswID property and beachName property
// for each beach in the array
  // update options object with beachName + 'Beach' + 'California'
  // make rp call with options 
  // extend with lat and lng properties
  // add set timeout for 250ms between each call to stay within maps threshold
// push array to data object with 'beaches' property
// store data obj as json and write to file

rp(options)
  .then(function (body) {
    console.log('got location data for:', options.qs.address);
    var results = JSON.parse(body).results[0];
    var lat = results.geometry.location.lat;
    var lng = results.geometry.location.lng;
  })
  .catch(function (err) {
    throw err;
  })

