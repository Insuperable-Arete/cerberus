angular.module('app.animationService', [])
  .service('AnimationService', ['$modal', '$rootScope', '$interval', 'MapService', 'd3Service',
    function($modal, $rootScope, $interval, MapService, d3Service) {

      // spotColors = ['#EBF5FF', '#ADD6FF', '#70B8FF', '#3399FF', '#246BB2'];
      // spotColors = ['#F0FFFA', '#C2FFEB', '#94FFDB', '#66FFCC', '#3D997A'];
      var spotColors = ['#E6FAF5', '#99EBD6', '#4DDBB8', '#00CC99', '#008F6B'];

      function open () {
        var context = this;
        var modalInstance = $modal.open({
          scope: $rootScope,
          animation: true,
          templateUrl: 'detailsModal.html',
          controller: 'DetailsController',
          size: 'lg',
          resolve: {
            forecast: function () {
              return JSON.parse(angular.element(context).attr('forecast'))[0];
            },
            beachName: function() {
              return JSON.parse(angular.element(context).attr('name'));
            }
          }
        });
      };

      function showTitle () {

        var padding = parseInt( this.getAttribute('cx'));
        var beachName = this.getAttribute('name').split('"')[1];

        var text = d3.select(this.parentElement)
          .append('svg:text')
          .attr('x', padding + 9)
          .attr('y', padding)
          .attr('dy', '.31em')
          .attr('opacity', 0)
          .text(beachName);

        text
          .transition()
          .duration(300)
          .attr('opacity', 1);

        d3.select(this)
          .transition()
          .duration(300)
          .attr('r', 8);
      }

      function hideTitle () {
        d3.select(this.parentElement)
          .selectAll('text')
          .transition()
          .duration(1500)
          .style('opacity', 0)
          .remove();

        d3.select(this)
          .transition()
          .duration(1500)
          .attr('r', 4.5);
      }

      function renderBeaches (timeIndex) {
        // All d3 renderings must be done after injecting the d3 library into the controller by calling d3Service.d3()
        d3Service.d3().then(function(d3) {
          var beaches = MapService.getBeachCache();
          var map = MapService.getMap();
          var overlay = new google.maps.OverlayView();

          overlay.onAdd = function () {
            // remove old beach markers if they exist
            d3.select('.beaches').remove();

            var layer = d3.select(this.getPanes().overlayMouseTarget).append('div')
              .attr('class', 'beaches');

            overlay.draw = function () {
              var projection = this.getProjection(),
                  padding = 10;

              var marker = layer.selectAll('svg')
                  .data(d3.entries(beaches))
                  .each(transform)
                .enter().append('svg:svg')
                  .each(transform)
                  .attr('class', 'marker');


              marker.append('svg:circle')
                .attr('r', 4.5)
                .attr('cx', padding)
                .attr('cy', padding)
                .attr('fill', function(d) {
                  if (!d.value.forecastData.length) {
                    return spotColors[0];
                  }
                  else {
                    return spotColors[d.value.forecastData[timeIndex].solidRating];
                  }
                })
                .attr('forecast', function(d) {
                  return JSON.stringify(d.value.forecastData);
                })
                .attr('position', function(d) {
                  return JSON.stringify([d.value.lat, d.value.lon]);
                })
                .attr('name', function(d){
                  return JSON.stringify(d.value.beachname);
                })
                .each(addListener);

              function transform(d) {
                d = new google.maps.LatLng(d.value.lat, d.value.lon);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style('left', (d.x - padding) + 'px')
                    .style('top', (d.y - padding) + 'px');
              }
              function addListener(d) {
                google.maps.event.addDomListener(this, 'click', open);
                google.maps.event.addDomListener(this, 'mouseover', showTitle);
                google.maps.event.addDomListener(this, 'mouseout', hideTitle);
              }
            };
          };
          overlay.setMap(map);
        }).then(
        function () {
          MapService.markersLoaded()
        });
      };

      function renderWind (timeIndex) {

        d3Service.d3().then(function(d3) {

          var beaches = MapService.getBeachCache();
          var map = MapService.getMap();

          var overlay = new google.maps.OverlayView();

          overlay.onAdd = function () {
            // remove old wind vectors if they exist
            d3.select('.winds').remove();

            var layer = d3.select(this.getPanes().overlayMouseTarget).append('div')
              .attr('class', 'winds');

            overlay.draw = function () {
              var projection = this.getProjection();
              var padding = 100;
              var t = 6; // length of the wind vector will be t * speed
              var lineColor = 'yellow';
              var lineWidth = '4';
              var maxAnimationDuration = 2000;
              var minAnimationDuration = 200;
              var windSpeedMultiplier = findWindSpeedMultiplier(25, maxAnimationDuration, minAnimationDuration);

              var windContainer = layer.selectAll('svg')
                  .data(d3.entries(beaches))
                  .each(transform)
                .enter().append('svg:svg')
                  .each(transform)
                  .attr('class', 'wind-container');

              var path = windContainer.append('svg:path')
                .attr('class', 'wind-vector')
                .attr('d', getD)
                .attr('stroke', lineColor)
                .attr('stroke-width', lineWidth)
                .attr('fill', 'none')
                .attr('stroke-dasharray', function(d) {
                  var l = d3.select(this).node().getTotalLength() / 2;
                  return l + ' ' + l;
                })
                .attr('opacity', '.50')
                .attr('stroke-linecap', 'round')
                .each(animatePath);

              function findWindSpeedMultiplier (maxWindSpeed, maxDuration, minDuration) {
                return (minDuration - maxDuration) / maxWindSpeed;
              }

              function animatePath (d) {
                var l = d3.select(this).node().getTotalLength();
                d3.select(this)
                  .attr('stroke-dashoffset', l)
                  .transition()
                  .duration(function(d) {
                    if(!d.value.forecastData.length) { return 0; }
                    var speed = d.value.forecastData[timeIndex].wind.speed;
                    return maxAnimationDuration + (speed * windSpeedMultiplier);
                  })
                  .ease('linear')
                  .attr('stroke-dashoffset', 0)
                  .each('end', animatePath);
              }

              function getD(d) {
                return 'M' + padding + ' ' + padding + ' L ' + getX2(d) + ' ' + getY2(d);
              }

              function getRadians (degrees) {
                return degrees * Math.PI / 180;
              }

              function getX2(d) {
                if(!d.value.forecastData.length) { return padding; }
                var direction = -(d.value.forecastData[timeIndex].wind.direction + 90);
                var speed = d.value.forecastData[timeIndex].wind.speed;
                var distance = speed * t;
                // var distance = 50
                return padding + distance * Math.cos( getRadians(direction) );
              };

              function getY2(d) {
                if(!d.value.forecastData.length) { return padding; }
                var direction = -(d.value.forecastData[timeIndex].wind.direction + 90);
                var speed = d.value.forecastData[timeIndex].wind.speed;
                var distance = speed * t;
                // var distance = 50
                return padding + distance * -Math.sin( getRadians(direction) );
              };

              function transform(d) {
                d = new google.maps.LatLng(d.value.lat, d.value.lon);
                d = projection.fromLatLngToDivPixel(d);
                return d3.select(this)
                    .style('left', (d.x - padding) + 'px')
                    .style('top', (d.y - padding) + 'px');
              }
            };
          };
          overlay.setMap(map);
        });
      };

      return {
        renderBeaches: renderBeaches,
        renderWind: renderWind
      };

    }]);
