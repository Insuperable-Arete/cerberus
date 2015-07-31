var cheerio = require('cheerio');
var _ = require('underscore');
var rp = require('request-promise');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

(function (firstPath, lastPath) {
  if (!firstPath || !lastPath) {
    throw new Error('script called without start or end path');
  }
  var writePath = __dirname + '/../json/globalSurfData.json';
  var pathIds = _.range(firstPath, lastPath);
  var urls = pathIds.map(function (id) {
    return 'http://magicseaweed.com/Atlantic-States-Surf-Forecast/' + id;
  });

  function getBeachesFromUrl(url) {
    return rp(url)
      .then(function (body) {
        console.log('successfully received response from:', url);
        var $ = cheerio.load(body);
        var data = $('.msw-map').attr('data-collection');
        console.log('processing....');
        if (!data) {
          return Promise.reject(new Error('no data found for url' + url));
        }
        return Promise.resolve(JSON.parse(data));
      })
      .catch(function (err) {
        throw new Error(err + 'request module was unable to receive a response from: ' + url);
      });
  }

  function write(spots) {
    console.log('total number of beaches found:', spots.length);
    return fs.writeFileAsync(writePath, JSON.stringify(spots));
  }

  Promise.reduce(urls, function (beaches, url) {
    return getBeachesFromUrl(url)
      .delay(2000)
      .then(function (beachCollection) {
        console.log('adding', beachCollection.length, 'beaches to collection');
        return beaches.concat(beachCollection);
      })
      .catch(function (err) {
        console.log(err, 'no new beaches added');
        return beaches;
      });
  }, [])
  .then(write)
  .then(function() {
    console.log('!!!SCRAPE COMPLETE!!! globalSurfData.json created in', writePath);
  });
}).call(null, 1, 109);