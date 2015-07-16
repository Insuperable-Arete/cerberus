var det = angular.module('app.detailsController', []);

det.controller('DetailsController', function($scope, $modalInstance, forecast) {
  $scope.forecast = forecast;
  console.log($scope.forecast);
  // TODO: Template for data selection from modal
  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.forecast);
  // };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
