angular.module('app.googleMapController', [])
  .controller('GoogleMapController', function($scope, MapService, d3Service) {


    $scope.spotColors = ['#3EFFF3', '#48E897', '#5CFF63', '#9AE848', '#FFFC54'];

    d3Service.d3().then(function(d3) {      
      var map = new google.maps.Map(d3.select('#map').node(), {
        zoom: 6,
        center: new google.maps.LatLng(36.958, -119.2658)
      });
<<<<<<< HEAD
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
          // console.log(JSON.parse(context.forecast[0]));
          // return JSON.parse(context.forecast[0]);
          return context.forecast[0];
        },
        beachName: function() {
          return context.name
        }
      }
    });
  };

  $scope.getBeachData();
});
=======

      MapService.getBeachData().then(function (beaches) {
        var overlay = new google.maps.OverlayView();
        
        overlay.onAdd = function () {
          var layer = d3.select(this.getPanes().overlayLayer).append('div')
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
              .attr('fill', function(d) { return $scope.spotColors[d.forecastData[0].solidRating] })

            marker.append('svg:text')
              .attr('x', padding + 7)
              .attr('y', padding)
              .attr('dy', '.31em')
              .text(function(d) { return d.beachname; });

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
    });
  });
>>>>>>> (feat) markers on the map are now dynamic d3 svgs
