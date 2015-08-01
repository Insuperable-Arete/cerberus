var typeAhead = angular.module("app.typeAheadController", []);

typeAhead.controller("TypeAheadController", function($scope, $rootScope, MapService, $state, AnimationService) {
  $scope.searchBeach = undefined;
  $scope.beachChoices = [];
  var beachCache;

  $rootScope.$on('beachCacheSet', function() {
    beachCache = MapService.getBeachCache();
    beachCache.forEach(function(beach) {
      $scope.beachChoices.push(beach.beachname);
    });
  });

  $scope.onSubmit = function (search) {
    var search = search || $scope.searchBeach;
    if (!!search && MapService.isInBeachCache(search)) {
      $state.go('details');
      MapService.setCurrentBeach(search);
      MapService.zoomToBeach(search);
      $scope.openSidebar();
      AnimationService.highlightMarker();
    }
  };

});
