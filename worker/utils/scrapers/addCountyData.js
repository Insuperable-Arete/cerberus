var Promise = require('bluebird');
var rp = require('request-promise');
var fs = Promise.promisifyAll(require('fs'));
var _ = require('underscore');
var cheerio = require('cheerio');

var MSW_API_KEY = '436cadbb6caccea6e366ed1bf364025779b64e18';
var MSW_SECRET = '436cadbb6caccea6e366ed1bf364025779b64e18';

var readPath = __dirname + '/../json/spotIdToName.json';
var writePath = __dirname + '/../json/spotsWithCounty.json';

// a function that takes a spot obj and returns a promise that resolves once county property is added from MSW site
var addCountyToSpot = function(spot) {
  var path = spot.beachName.split(' ').join('-') + '-Surf-Report/' + spot.mswId + '/';
  var url = 'http://magicseaweed.com/' + path;

  return rp(url)
    .then(function (body) {
      console.log('successfully requested GET to:', url)
      var $ = cheerio.load(body);
      var el = $("span:contains('County')");
      var scrapedCounty = el.length ? el[0].children[0].data.split(' - ')[0] : null;
      spot.county = scrapedCounty;
      return spot;
    })
    .catch(function (err) {
      console.log(err);
      throw new Error('Error accessing server on GET to:', spot.beachName);
    });
};

fs.readFileAsync(readPath, {encoding: 'utf8'})
  // convert to an array of objects with mswID and beachName property
  .then(function (spotMap) {
    spotMap = JSON.parse(spotMap);
    return _.reduce(spotMap, function (memo, name, id) {
      memo.push({
        mswId: id,
        beachName: name
      });
      return memo;
    }, []);
  })
  // add county as a property to each beach object
  .then(function (spots) {
    return Promise.all(
      _.map(spots, function (spot) {
        return addCountyToSpot(spot);
      }));
  })
  // package updated beaches as a json object and save to writePath
  .then(function (amendedSpots) {
    var result = { beaches: amendedSpots };
    fs.writeFileAsync(writePath, JSON.stringify(result));
  })
  .catch(function (err) {
    console.log(err);
  })



