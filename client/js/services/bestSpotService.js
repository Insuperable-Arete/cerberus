angular.module('app.bestSpotService', [])
  .service('BestSpotService', ['$rootScope', 'MapService',
    function($rootScope, MapService) {

      var directionsDisplay;
      var map;
      var directionsService = new google.maps.DirectionsService();

      var getBestWavesFromCurrentLoc = function(distance, timeIndex) {

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = [position.coords.latitude, position.coords.longitude];
            getBestWavesFromLoc(pos, distance, timeIndex);
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
      };

      // loc will be a twople representing [lat, lng]
      // distance will be a number of miles
      var getBestWavesFromLoc = function (loc, distance, timeIndex) {
        MapService.getBeachData().then(function (beaches) {
          loc = new google.maps.LatLng(loc[0], loc[1]);
          var beachesWithinDistance = _.filter(beaches, function(beach) {
            var beachCoords = new google.maps.LatLng(beach.lat, beach.lon);
            // computeDistanceBetween returns a distance in meters, must convert to mi to
            beach.distance = google.maps.geometry.spherical.computeDistanceBetween(loc, beachCoords) * 0.00062137;
            beach.coords = beachCoords;
            return beach.distance <= distance;
          });

          if (!beachesWithinDistance.length) {
            console.log('no beaches found within distance', distance);
            return null;
          }

          var destination = beachesWithinDistance.reduce(function(best, cur) {

            var bestSolidRating = best.forecastData[timeIndex].solidRating;
            var bestFadedRating = best.forecastData[timeIndex].fadedRating;
            var bestTotalStars = bestSolidRating + bestFadedRating;

            var curSolidRating = cur.forecastData[timeIndex].solidRating;
            var curFadedRating = cur.forecastData[timeIndex].fadedRating;
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
          console.log('go slay some waves at', destination.beachname);
          renderPathToBeach(loc, destination.coords);
        });
      };

      var renderPathToBeach = function (origin, destination) {

        map = MapService.getMap();

        if (directionsDisplay) {
          directionsDisplay.setMap(null);
        }

        directionsDisplay = new google.maps.DirectionsRenderer();

        var options = {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          provideRouteAlternatives: false,
          unitSystem: google.maps.UnitSystem.IMPERIAL
        };

        directionsService.route(options, function(response, status) {
          if (status === google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
          }
        });

        directionsDisplay.setMap(map);
      };


      var renderPathToBeachFromCurrentLocation = function(beach) {
  
        var destination = new google.maps.LatLng(beach.lat, beach.lon);

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            var pos = [position.coords.latitude, position.coords.longitude];
            var origin = new google.maps.LatLng(pos[0], pos[1]);
            renderPathToBeach(origin, destination);
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
      };

      var hideRoute = function () {
        if (directionsDisplay) {
          directionsDisplay.setMap(null);
        }
      };

      return {
        renderPathToBeach: renderPathToBeach,
        getBestWavesFromCurrentLoc: getBestWavesFromCurrentLoc,
        renderPathToBeachFromCurrentLocation: renderPathToBeachFromCurrentLocation,
        hideRoute: hideRoute
      };


    }]);