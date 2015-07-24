var cheerio = require('cheerio');
var _ = require('underscore');
var rp = require('request-promise');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

// url to scrape
var url = 'http://magicseaweed.com/site-map.php';

// a function that takes some cheerio html represented by $ and a keyword to identify a header on the site map
// and returns an object of all the spots from the table below the header where the key = spotID and val = spotName
var getSpotsByKeyword = function (keyword, $) {
  var selector = ".header:contains('" + keyword + "')";
  var a = $(selector).next().find('a');

  // spots will be an array with spots looking like "/Bolinas-Surf-Report/4221/"
  var spots = _.map(a, function (el, i) {
    return el.attribs.href;
  });

  // convert "/Bolinas-Surf-Report/4221/" to 4221: Bolinas and append to obj;
  return _.reduce(spots, function (memo, spot) {
    var id = spot.split('/')[2];
    var name = spot.split('/')[1].split('-').slice(0, -2).join(' ');
    memo[id] = name;
    return memo;
  }, {});
};

// initiate the scrape to url
rp(url)
  .then(function (body) {
    var $ = cheerio.load(body);

    return _.extend(
      getSpotsByKeyword('California', $),
      getSpotsByKeyword('County', $)
    );
  })
  .then(function (spotMap) {
    fs.writeFileAsync(__dirname + '/spotIdToName.json', JSON.stringify(spotMap));
  })
  .then(function (spotMap) {
    console.log('Scrape Successfull!: spotIdToName.json created in', __dirname);
  })

