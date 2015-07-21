angular.module('app.mapService', [])
  .service('MapService', function($http, $rootScope) {

    var getBeachData = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:1337/fetch'
      }).then(function (resp) {
        return resp.data;
      });
    };

    var markersLoaded = function() {
      $rootScope.$broadcast('map loaded');
    };

    return {
      getBeachData: getBeachData,
      markersLoaded: markersLoaded
    };
  });
