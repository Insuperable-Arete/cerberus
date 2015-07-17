angular.module('app.directives', [])
  .directive('d3Spot', ['d3Service', function (d3Service) {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          console.log('in link function on d3 spot directive...');
          // miniscule representation of actual data
          scope.data = [{
            mswId: 162,
            beachname: "Mavericks",
            lat: 37.4924,
            lon: -122.501,
            forecastData: [{solidRating: 5}]
          }];

          var svg = d3.select(element[0])
                      .append('svg')
                      .style('width', '100%')
                      .attr('height', '800px');

          // the data passed into render will be scope.data aka one beach object
          scope.render = function (data) {
            console.log('scope.render called...')
            // remove all previous items before render
            svg.selectAll('*').remove();

            // if no data is passed in, return out of the element
            if (!data) {
              return;
            }

            // setup variables for the circle
            // color will be determined by the solidRating on the data.
            // radius will be static
            // cx and cy will depend on lat/lon
            var radius = '100';
            var color = "blue";
            var cx = '30';
            var cy = '30';

            svg.selectAll('circle')
              .data(data).enter()
                .append('circle')
                .attr('cx', cx)
                .attr('cy', cy)
                .attr('r', radius)
                .attr('fill', color)
          }

          scope.render(scope.data);


        
        });
      }
    };
  }]);