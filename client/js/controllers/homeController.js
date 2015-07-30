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
      $timeout(function() { $scope.detailsTab = true; }, 1000)
    } else {
      $scope.isOnDetails = false;
      $scope.detailsTab = false;
    }
  });

  $rootScope.$on('$locationChangeStart', function() {
    if ($location.url() === "/") {
      MapService.setCurrentTimeStamp(0);
    }
  })

  $scope.$on('beach clicked', function() {
      $state.go('details');
      $scope.openSidebar();
  });

  $scope.toggleDetailsTab = function() {
    $scope.detailsTab = !$scope.detailsTab;
  }
  $scope.getDirections = function () {
    BestSpotService.getBestWavesFromCurrentLoc($scope.distance, $scope.timeIndex);
  };

  $scope.toggleClass = function() {
    $scope.sideMenu = !$scope.sideMenu;
  };

  $scope.openSidebar = function() {
    $scope.sideMenu = true;
  };

  $scope.closeSidebar = function() {
    $scope.sideMenu = false;
  };

  $scope.toggleTab = function() {
    $scope.bottomTab = !$scope.bottomTab;
  };

  $scope.$on('map loaded', function() {
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
  });

  $scope.resetMap = function () {
    var map = MapService.getMap();
    AnimationService.hideTitle(AnimationService.getHighlightedBeach());
    $state.go('default')
    $scope.closeSidebar();
    map.setCenter(new google.maps.LatLng(36.958, -119.2658));
    map.setZoom(6);
  }

});
