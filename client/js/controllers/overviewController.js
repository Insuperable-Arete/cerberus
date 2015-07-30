var overview = angular.module('app.overviewController', []);

overview.controller('OverviewController', function($scope, MapService, AnimationService) {
  $scope.beaches = MapService.getBeachCache();
  $scope.selectBeach = function(beach) {
    MapService.setCurrentBeach(beach.beachname);
    MapService.zoomToBeach(beach.beachname);
    AnimationService.highlightMarker();
  }
});
