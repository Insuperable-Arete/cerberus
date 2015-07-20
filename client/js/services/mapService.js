angular.module('app.mapService', [])
  .service('MapService', function($http) {
    var getBeachData = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:1337/fetch'
      }).then(function (resp) {
        return resp.data;
      });
    };

    return {
      getBeachData: getBeachData
    };
  });
