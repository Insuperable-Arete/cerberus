var home = angular.module('app.homeController', []);

home.controller('HomeController', function($scope, $modal, $log, $timeout, MapService) {
  $scope.mapLoaded = false;
  $scope.animationFinished = false;
  $scope.$on('map loaded', function() {
    $timeout(function() {
      $scope.mapLoaded = true;
      $timeout(function() {
        $scope.animationFinished = true;
      }, 2000);
    }, 10000);
  });

  $scope.distanceSlider = 100;

  $scope.getBestWavesFromCurrentLoc = function(distance) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var pos = [position.coords.latitude, position.coords.longitude];
        $scope.getBestWavesFromLoc(pos, distance);
      }, function() {
        handleNoGeolocation(true);
      });
    } else {
      handleNoGeolocation(false);
    }
    // can build additional error handling within this 
    function handleNoGeolocation(errorFlag) {
      if (errorFlag) {
        console.log('Error: the Geolocation service failed');
      } else {
        console.log('Error: your browser doesn\'t support geolocation');
      }
    }
  }
  
  // loc will be a twople representing [lat, lng]
  // distance will be a number of miles
  $scope.getBestWavesFromLoc = function (loc, distance) {
    MapService.getBeachData().then(function (beaches) {
      loc = new google.maps.LatLng(loc[0], loc[1]);
      var beachesWithinDistance = _.filter(beaches, function(beach) {
        var beachCoords = new google.maps.LatLng(beach.lat, beach.lon);
        // computeDistanceBetween returns a distance in meters, must convert to mi to 
        beach.distance = google.maps.geometry.spherical.computeDistanceBetween(loc, beachCoords) * 0.00062137;
        return beach.distance <= distance;
      });

      if (!beachesWithinDistance.length) {
        console.log('no beaches found within distance', distance);
        return null;
      }

      var topBeach = beachesWithinDistance.reduce(function(best, cur) {

        var bestSolidRating = best.forecastData[0].solidRating;
        var bestFadedRating = best.forecastData[0].fadedRating;
        var bestTotalStars = bestSolidRating + bestFadedRating;

        var curSolidRating = cur.forecastData[0].solidRating;
        var curFadedRating = cur.forecastData[0].fadedRating;
        var curTotalStars = curSolidRating + curFadedRating;

        // compare total number of stars first
        if (bestTotalStars === curTotalStars) {
          // compare solid ratings. if there's the same number of stars, the beach with the higher solid rating has less wind and therefore more pleasureable waves
          if (bestSolidRating === curSolidRating) {
            // if both beaches have the same stats, the best will be the closer of the two
            return best.distance < cur.distance ? best : cur;
          }
          return bestSolidRating > curSolidRating ? best : cur;
        }
        return bestTotalStars > curTotalStars ? best : cur;
      });
      console.log('go slay some waves at', topBeach.beachname);
      return topBeach;
    });
  };

  $scope.$on("slideEnded", function () {
    console.log('$scope.distanceSlider =', $scope.distanceSlider);
    $scope.getBestWavesFromCurrentLoc($scope.distanceSlider);
  });

});
