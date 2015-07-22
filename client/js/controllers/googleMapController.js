angular.module('app.googleMapController', [])
  .controller('GoogleMapController', function($scope, $modal, MapService, d3Service) {

    // $scope.spotColors = ['#EBF5FF', '#ADD6FF', '#70B8FF', '#3399FF', '#246BB2'];
    // $scope.spotColors = ['#F0FFFA', '#C2FFEB', '#94FFDB', '#66FFCC', '#3D997A'];
    $scope.spotColors = ['#E6FAF5', '#99EBD6', '#4DDBB8', '#00CC99', '#008F6B'];

    $scope.open = function() {
      console.log('scope clicked')
      // TODO: Add modal animation toggle
      // $scope.animationsEnabled = true;
      //
      // $scope.toggleAnimation = function() {
      //   $scope.animationsEnabled = !$scope.animationsEnabled;
      // }
      var context = this;
      var modalInstance = $modal.open({
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

    $scope.showTitle = function () {

      console.log('entered spot');
      var padding = parseInt( this.getAttribute('cx'));
      var beachName = this.getAttribute('name').split('"')[1];

      console.log(this.parentElement);

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
        .attr('opacity', 1)
      
      d3.select(this)
        .transition()
        .duration(300)
        .attr('r', 8);
    }

    $scope.hideTitle = function() {
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

    $scope.renderMarkers = function () {
      // All d3 renderings must be done after injecting the d3 library into the controller by calling d3Service.d3()
      d3Service.d3().then(function(d3) {
        // var bounds =
        var map = new google.maps.Map(d3.select('#map').node(), {
          zoom: 6,
          minZoom: 6,
          center: new google.maps.LatLng(36.958, -119.2658)
        });

        MapService.setMap(map);
        // map.fitBounds()
        MapService.getBeachData().then(function (beaches) {
          console.log("beaches in gmapController: ", beaches);
          MapService.setBeachCache(beaches);
          $scope.beaches = beaches;

          var overlay = new google.maps.OverlayView();

          overlay.onAdd = function () {
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
                    return $scope.spotColors[0];
                  }
                  else {
                    return $scope.spotColors[d.value.forecastData[0].solidRating];
                  }
                })
                .attr('forecast', function(d) {
                  $scope.forecastData = d.value.forecastData
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
                console.log('event listener follow...');
                google.maps.event.addDomListener(this, 'click', $scope.open);
                google.maps.event.addDomListener(this, 'mouseover', $scope.showTitle);
                google.maps.event.addDomListener(this, 'mouseout', $scope.hideTitle);
              }
            };
          };
          overlay.setMap(map);
        });
      }).then(MapService.markersLoaded());
    };
    $scope.renderMarkers();
  });
