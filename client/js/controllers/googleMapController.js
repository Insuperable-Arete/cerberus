var map = angular.module('app.googleMapController', ["ngMap"]);

map.controller('GoogleMapController', function($scope, $modal, MapService) {
  console.log("beginning of controller??");
  var markers = [];
  $scope.getBeachData = function(){
    MapService.getBeachData()
      .then(function(result){
        $scope.beachData = result.data;
        // return result.data;
      })
  };
  // .then(function() {
  //     //TODO: Fill out what to do once beach data is obtained
  //     //TODO: Stop spinner
  //   // });

  // TODO: Add modal animation toggle
  // $scope.animationsEnabled = true;
  //
  // $scope.toggleAnimation = function() {
  //   $scope.animationsEnabled = !$scope.animationsEnabled;
  // }

  $scope.open = function() {
    var context = this;
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: 'detailsModal.html',
      controller: 'DetailsController',
      size: 'lg',
      resolve: {
        forecast: function () {
          return JSON.parse(context.forecast[0]);
        },
        beachName: function() {
          return context.name
        }
      }
    });
  };

  $scope.getBeachData();
});
