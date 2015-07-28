var det = angular.module('app.detailsController', []);

det.controller('DetailsController', function($scope, $modalInstance, forecast, beachName) {
  $scope.forecast = forecast;
  $scope.solidRating = $scope.forecast.solidRating;
  $scope.fadedRating = $scope.forecast.fadedRating;
  $scope.swellHeight = $scope.forecast.swell.components.combined.height;
  $scope.swellPeriod = $scope.forecast.swell.components.combined.period;
  $scope.windSpeed = $scope.forecast.wind.speed;
  $scope.windDirection = $scope.forecast.wind.compassDirection;
  $scope.beachName = beachName;

  //TODO: refactor into service

  // Takes in an animation name linked to a scope variable (eg. windSpeed)
  // and an option div specifier (eg. 1 for rectangle-1)
  $scope.className = function(animationName) {
    // Windspeed animation

  };

  //
  $scope.windSpeedClass = function(specifier) {
    specifier = specifier || "";
    if (typeof specifier !== "string") {
      return null;
    }
    var className = "rectangle" + specifier;

    if ($scope.windSpeed > 10) {
      className += "-fast";
    }
    if ($scope.windSpeed < 4) {
      className += "-slow"
    }

    return className;
  };
  $scope.swellHeightClass = function(specifier) {
    specifier = specifier || "";
    if (typeof specifier !== "string") {
      return null;
    }
    var className = "path" + specifier;

    if ($scope.swellHeight >= 3) {
      className += "-large";
    }
    if ($scope.swellHeight <= 1) {
      className += "-small"
    }

    return className;
  };
  $scope.swellPeriodClass = function(specifier) {
    specifier = specifier || "";
    if (typeof specifier !== "string") {
      return null;
    }
    var className = "path" + specifier;

    if ($scope.swellPeriod >= 10) {
      className += "-fast";
    }
    if ($scope.swellPeriod <= 4) {
      className += "-slow"
    }

    return className;
  };

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

  // TODO: Template for data selection from modal
  // $scope.ok = function () {
  //   $modalInstance.close($scope.selected.forecast);
  // };
  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});
