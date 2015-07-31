var home = angular.module('app.homeController', []);

home.controller('HomeController', function($rootScope, $state, $scope, $modal, $timeout, $interval, $location, MapService, BestSpotService, AnimationService) {

  $scope.distance = 100;
  $scope.mapLoaded = false;
  $scope.animationFinished = false;
  $scope.counter = 10;
  $scope.sideMenu = false;
  $scope.bottomTab = false;
  $scope.isOnDetails = false;
  $scope.detailsTab = false;

  $rootScope.$on('$locationChangeSuccess', function () {
    if ($location.url() === "/details") {
      $scope.isOnDetails = true;
      $scope.openSidebar();
      $timeout(function() { $scope.detailsTab = true; }, 1000)
    } else {
      $scope.isOnDetails = false;
      $scope.detailsTab = false;
    }
  });

  $scope.$on('beach clicked', function() {
      $state.go('details');
      if ($scope.sideMenu === true) {
        $scope.$apply(function() {$scope.detailsTab = true;})
      }
      // or if not on details
      if ($scope.sideMenu === false) {
        $scope.$apply($scope.openSidebar());
        $timeout(function() { $scope.detailsTab = true; }, 1000)
      }
      $scope.bottomTab = false;
  });

  $scope.toggleDetailsTab = function() {
    $scope.detailsTab = !$scope.detailsTab;
  }
  $scope.getDirections = function () {
    BestSpotService.getBestWavesFromCurrentLoc($scope.distance, MapService.getCurrentTimeStamp());
  };

  $scope.toggleClass = function() {
    $scope.sideMenu = !$scope.sideMenu;
  };

  $scope.openSidebar = function() {
    $scope.sideMenu = true;
  };

  $scope.closeSidebar = function() {
    $scope.sideMenu = false;
    $scope.detailsTab = false;
  };

  $scope.toggleTab = function() {
    $scope.bottomTab = !$scope.bottomTab;
  };

  $scope.startLoadingScreen = function() {
    var decrementCounter = $interval(function() {
      if (typeof $scope.counter === "string") {
        $scope.counter = 10;
      }
      if ($scope.counter > 1) {
        $scope.counter = $scope.counter - 1;
      } else {
        $scope.counter = "TEN";
        $interval.cancel(decrementCounter);
      }
      //Time between each tick
    }, 500);
    $timeout(function() {
      $scope.mapLoaded = true;
      $timeout(function() {
        $scope.animationFinished = true;
      }, 2000);
      //Time to remove overlay
    }, 5000);
  };

  $scope.resetMap = function () {
    var map = MapService.getMap();
    AnimationService.hideTitle(AnimationService.getHighlightedBeach());
    $state.go('default')
    $scope.closeSidebar();
    map.setCenter(new google.maps.LatLng(36.958, -119.2658));
    map.setZoom(6);
  }
  $scope.startLoadingScreen();
});
