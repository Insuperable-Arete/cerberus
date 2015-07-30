var tab = angular.module('app.detailsTabController', [])

tab.controller('DetailsTabController', function($scope, MapService) {
  $scope.theBeach;

  var init = function() {
    $scope.theBeach = MapService.getCurrentBeach();
    $scope.timeIndex = MapService.getCurrentTimeStamp() || 0;
    $scope.forecast = $scope.theBeach.forecastData[$scope.timeIndex];
    $scope.solidRating = $scope.forecast.solidRating;
    $scope.fadedRating = $scope.forecast.fadedRating;
    $scope.swellHeight = $scope.forecast.swell.components.combined.height;
    $scope.swellPeriod = $scope.forecast.swell.components.combined.period;
    $scope.windSpeed = $scope.forecast.wind.speed;
    $scope.windDirection = $scope.forecast.wind.compassDirection;
    $scope.beachName = $scope.theBeach.beachname;

    console.log('Tab');
    console.log($scope.timeIndex);
    console.log($scope.forecast);
    console.log($scope.beachName);
  };

  $scope.$on('beach selected', function() {
    init();
  });
  $scope.$on('time changed', function() {
    if (MapService.getCurrentBeach()) {
      init();
    }
  });

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
});
