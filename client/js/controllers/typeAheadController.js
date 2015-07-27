var typeAhead = angular.module("app.typeAheadController", []);

typeAhead.controller("TypeAheadController", function($scope, $rootScope, MapService) {
  $scope.searchBeach = undefined;
  $scope.beachChoices = [];
  var beachCache;

  $rootScope.$on('beachCacheSet', function() {
    beachCache = MapService.getBeachCache();
    beachCache.forEach(function(beach) {
      $scope.beachChoices.push(beach.beachname);
    });
  });

// for testing 
  $scope.printCurrentBeach = function(){
    MapService.setCurrentBeach($scope.searchBeach);
    console.log(MapService.getCurrentBeach());
  };

  $scope.printBounds = MapService.printBounds;
  $scope.zoomToBeach = MapService.zoomToBeach;
});
