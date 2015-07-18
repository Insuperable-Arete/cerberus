var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));
var http = require('http');

var rp = require('request-promise');

fs.readFileAsync('../json/spotIdToName.json')
.then(function(data) {
  var parsed = JSON.parse(data);
  return parsed;
})
.then(function(scraped) {
  return fs.readFileAsync('../json/mswMap.json')
  .then(function(mapData) {
    var parsedMap = JSON.parse(mapData);
    for (var i = 0; i < parsedMap.length; i++) {
      var currentId = parsedMap[i]._id;
      var currentName = parsedMap[i].name;
      var currentLat = parsedMap[i].lat;
      var currentLon = parsedMap[i].lon;
      scraped[currentId] = {
        mswId: currentId,
        beachName: currentName,
        lat: currentLat,
        lon: currentLon
      };
    }
    return scraped;
  });
})
.then(function(data) {
  var newArray = [];
  for (var id in data) {
    newArray.push(data[id]);
  }
  var newJSON = JSON.stringify(newArray);
  fs.writeFileAsync('../json/locationsWithCoords.json', newJSON)
  .then(function() {
    console.log('Complete write!')
  })
})
