angular.module('app.mapService', [])
  .factory('MapService', function($http, $rootScope) {

    var map;
    var beachCache;
    var currentBeach;
    var currentTimeIndex;
    var currentTimeStamps;
    var beachInfo = {
      forecast: null,
      name: null,
      time: null
    };

    var updateBeachInfo = function() {
      if (!currentBeach) {
        throw new Error('Error: updateBeachInfo failed, no beach selected');
        return;
      }
      if (!currentTimeIndex) {
        currentTimeIndex = 0;
      }
      beachInfo.forecast = currentBeach.forecastData[currentTimeIndex];
      beachInfo.name = currentBeach.beachname;
      beachInfo.time = currentTimeStamps[currentTimeIndex];
    };

    var getBeachData = function() {
      return $http({
        method: 'GET',
        url: '/fetch'
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
          targetCoordinates.lat = beachCache[i].lat;
          targetCoordinates.lng = beachCache[i].lon;
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
      beachInfo: beachInfo
    };
  });
