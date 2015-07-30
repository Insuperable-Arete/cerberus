var sideBar = angular.module('app.detailsSidebarController', []);

sideBar.controller('DetailsSidebarController', function($timeout, $rootScope, $scope, MapService, AnimationService, BestSpotService, $location) {

  $scope.init = function() {
    var beaches = MapService.getBeachCache();
    $scope.timeIndex = MapService.getCurrentTimeStamp() || 0;
    $scope.selectedBeach = MapService.getCurrentBeach();
    $scope.timeStamps = MapService.getLocalTimeStamps(beaches);
    $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    $scope.currentForecast = $scope.selectedBeach.forecastData[$scope.timeIndex];
    $scope.fadedRating = $scope.currentForecast.fadedRating;
    $scope.solidRating = $scope.currentForecast.solidRating;
    $scope.beachname = $scope.selectedBeach.beachname;
    $scope.detailsTab = false;

    console.log('Side Menu');
    console.log($scope.timeIndex);
    console.log($scope.currentForecast);
    console.log($scope.beachname);
  };

  // $scope.init()

  // $rootScope.$on('$locationChangeStart', function() {
  //   if ($location.url() === "/") {
  //     MapService.setCurrentTimeStamp(0);
  //   }
  // })

  $scope.updateForecast = function() {
    $scope.selectedBeach = MapService.getCurrentBeach();
    $scope.currentForecast = $scope.selectedBeach.forecastData[$scope.timeIndex];
    $scope.beachname = $scope.selectedBeach.beachname;
    $scope.fadedRating = $scope.currentForecast.fadedRating;
    $scope.solidRating = $scope.currentForecast.solidRating;

    console.log('Side Menu');
    console.log($scope.timeIndex);
    console.log($scope.currentForecast);
    console.log($scope.beachname);
  }

  $scope.toRepeat = function(num) {
    var results = [];
    for (var i = 0; i < num; i++) {
      results.push(i);
    }
    return results;
  }

  $scope.remainingStars = function() {
    return 5 - $scope.fadedRating - $scope.solidRating;
  }

  if (MapService.getBeachCache()) {
    $scope.init();
  }

  $scope.$on('beachCacheSet', function() {
    $scope.init();
  });

  $scope.toggleTab = function() {
    $scope.detailsTab = !$scope.detailsTab;
  };

  $scope.$on('slideEnded', function() {
    $scope.forecastTime = $scope.timeStamps[$scope.timeIndex];
    MapService.setCurrentTimeStamp($scope.timeIndex);
    AnimationService.renderWind($scope.timeIndex);
    AnimationService.renderBeaches($scope.timeIndex);
    $scope.updateForecast();
    $timeout(function(){
      AnimationService.highlightMarker();
    }, 100);
  });

  $scope.$on('beach selected', function() {
    $scope.updateForecast();
  });

  $scope.getDirections = function() {
    BestSpotService.renderPathToBeachFromCurrentLocation($scope.selectedBeach);
  };



});
