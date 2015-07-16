var det = angular.module('app.detailsController', []);

det.controller('DetailsController', function($scope, $modalInstance, forecast, beachName) {
  $scope.forecast = forecast[0];
  $scope.solidRating = $scope.forecast.solidRating;
  $scope.fadedRating = $scope.forecast.fadedRating;
  $scope.swellHeight = $scope.forecast.swell.components.combined.height;
  $scope.swellPeriod = $scope.forecast.swell.components.combined.period;
  $scope.beachName = beachName;

  $scope.toRepeat = function(num) {
    var results = [];
    for (var i = 0; i < num; i++) {
      results.push(i);
    }
    return results;
  }
  $scope.remainingStars = function(num) {
    return 5 - num;
  }
  console.log($scope.forecast);
  console.log($scope.solidRating);
  console.log($scope.fadedRating);
  console.log($scope.swellHeight);
  console.log($scope.swellPeriod);
  // TODO: Template for data selection from modal
  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.forecast);
  // };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
