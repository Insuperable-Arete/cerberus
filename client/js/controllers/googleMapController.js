var map = angular.module('app.googleMapController', ["ngMap"]);

map.controller('GoogleMapController', function($scope, MapService) {
  console.log("beginning of controller??");
  $scope.getBeachData = function() {
    MapService.getBeachData()
     .then(function(result){
      //  console.log(result.data[0]);
       $scope.beachData = result.data;
       console.log($scope.beachData);
       return result.data;
     })
    // .then(function() {
      //TODO: Fill out what to do once beach data is obtained
      //TODO: Stop spinner
    // });
  };
  $scope.getBeachData();
});
