var home = angular.module('app.homeController', []);

home.controller('HomeController', function($scope, $modal, $log, $timeout, MapService) {
  $scope.mapLoaded = false;
  $scope.animationFinished = false;
  $scope.$on('map loaded', function() {
    $timeout(function() {
      $scope.mapLoaded = true;
      $timeout(function() {
        $scope.animationFinished = true;
      }, 2000)
    }, 10000)
  });
});
