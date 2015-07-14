var map = angular.module('app.mapService', []);

map.service('MapService', function($http) {
  //TODO: Change to actual URL for actual surf data
  this.getBeachData = function() {
    //TODO: Start spinner. Spinner will need to be stopped on MapController
    return $http({
      method: 'GET',
      url: 'http://localhost:1337/dbData'
    });
  };
});
