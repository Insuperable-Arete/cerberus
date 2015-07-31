var sideBar = angular.module('app.detailsSidebarController', []);

sideBar.controller('DetailsSidebarController', function($timeout, $rootScope, $scope, MapService, AnimationService, BestSpotService, $location) {
  $scope.init = function() {
    $scope.timeIndex = 0;
    MapService.setCurrentTimeStamp($scope.timeIndex);
    $scope.beachInfo = MapService.beachInfo;
  };
  $scope.init();

  $scope.$on('slideEnded', function() {
    MapService.setCurrentTimeStamp($scope.timeIndex);
    AnimationService.renderWind($scope.timeIndex);
    AnimationService.renderBeaches($scope.timeIndex);
    $timeout(function(){
      AnimationService.highlightMarker();
    }, 100);
  });

  $scope.toRepeat = function(num) {
    var results = [];
    for (var i = 0; i < num; i++) {
      results.push(i);
    }
    return results;
  }

  $scope.remainingStars = function() {
    return 5 - $scope.beachInfo.forecast.fadedRating - $scope.beachInfo.forecast.solidRating;
  }

  $scope.toggleTab = function() {
    $scope.detailsTab = !$scope.detailsTab;
  };

  $scope.getDirections = function() {
    // debugger;
    BestSpotService.renderPathToBeachFromCurrentLocation($scope.beachInfo);
  };

  $scope.hideDirections = function () {
    BestSpotService.hideRoute();
  }

});
