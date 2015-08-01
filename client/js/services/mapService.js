angular.module('app.mapService', [])
  .factory('MapService', function($http, $rootScope, $state) {

    var map;
    var beachCache;
    var currentBeach;
    var currentTimeIndex = 0;
    var currentTimeStamps;
    // beachInfo exposes only the properties needed by external controllers
    var beachInfo = {
      forecast: null,
      name: null,
      time: null,
      lat: null,
      lon: null,
      summary: null
    };

    var updateBeachInfo = function() {
      if (!currentBeach) {
        $state.go('default');
        throw new Error('Error: updateBeachInfo failed, no beach selected');
        return;
      }
      if (!currentTimeIndex) {
        currentTimeIndex = 0;
      }
      // Update beachInfo object to re-render the views
      beachInfo.forecast = currentBeach.forecastData[currentTimeIndex];
      beachInfo.name = currentBeach.beachname;
      beachInfo.time = currentTimeStamps[currentTimeIndex];
      beachInfo.lat = currentBeach.lat;
      beachInfo.lon = currentBeach.lon;
      beachInfo.summary = currentBeach.description;
    };

    var getBeachData = function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:1337/fetch'
      }).then(function (resp) {
        return resp.data;
      });
    };

    var setMap = function(mapInstance) {
      map = mapInstance;
    };

    var getMap = function() {
      if (!map) {
        return null;
      }
      return map;
    };

    // setting beachCache for ready access without extra ajax calls
    var setBeachCache = function(beachObj){
      beachCache = beachObj;
      currentTimeStamps = getLocalTimeStamps(beachCache);
      $rootScope.$broadcast("beachCacheSet", getLocalTimeStamps(beachCache));
    };

    var getLocalTimeStamps = function (beaches) {
      var beach;
      // get the first beach that has forecast Data
      for (var i = 0; i < beaches.length; i++) {
        if (beaches[i].forecastData.length) {
          beach = beaches[i];
          break;
        }
      }
      return beach.forecastData.map(function (forecast) {
        var options = {
          weekday: 'long',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        };
        var date = new Date (forecast.localTimestamp * 1000);
        return date.toLocaleTimeString('en-us', options);
      });
    };

    var getBeachCache = function(){
      return beachCache;
    };

    var zoomToBeach = function(beach){
      var targetCoordinates = {};
      var zoomMap = getMap();
      for(var i = 0; i < beachCache.length; i++){
        if(beachCache[i].beachname === beach){
          // .142, -.122
          targetCoordinates.lat = beachCache[i].lat - .142;
          targetCoordinates.lng = beachCache[i].lon + .122;
        }
      }
      map.setCenter(targetCoordinates);
      map.setZoom(11);
    };

    var setCurrentBeach = function(beachName){
      for(var i = 0; i < beachCache.length; i++){
        if(beachCache[i].beachname === beachName){
          currentBeach = beachCache[i];
        }
      }
      updateBeachInfo();
    };

    var setCurrentTimeStamp = function(i) {
      currentTimeIndex = i;
      updateBeachInfo();
    };

    var isInBeachCache = function(beachName) {
      for (var i = 0; i < beachCache.length; i++) {
        if (beachCache[i].beachname === beachName) {
          return true;
        }
      }
      return false;
    };

    var getCurrentTimeIndex = function() {
      return currentTimeIndex;
    }

    return {
      getBeachData: getBeachData,
      setMap: setMap,
      getMap: getMap,
      setBeachCache: setBeachCache,
      getBeachCache: getBeachCache,
      getLocalTimeStamps: getLocalTimeStamps,
      zoomToBeach: zoomToBeach,
      setCurrentBeach: setCurrentBeach,
      setCurrentTimeStamp: setCurrentTimeStamp,
      currentBeach: currentBeach,
      currentTimeIndex: currentTimeIndex,
      updateBeachInfo: updateBeachInfo,
      beachInfo: beachInfo,
      isInBeachCache: isInBeachCache,
      getCurrentTimeIndex: getCurrentTimeIndex
    };
  });
