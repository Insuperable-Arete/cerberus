describe("DetailsController", function(){
  beforeEach(module('app'));

  var $controller;

  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));

  var $scope = {};
  var $modalInstance = {};
  var forecast = {
    solidRating: 5,
    fadedRating: 5,
    swell: {
      components: {
        combined: {
          height: 10,
          period: 5
        }
      }
    },
    wind: {
      speed: 10,
      compassDirection: "NW"
    }
  };
  var beachName = 'Newport Beach';

  beforeEach(inject(function() {
    var controller = $controller('DetailsController', {
      $scope: $scope,
      $modalInstance: $modalInstance,
      forecast: forecast,
      beachName: beachName
    });
  }));

  describe("$scope.toRepeat", function() {

    it("returns an array", function() {
      expect(Array.isArray($scope.toRepeat())).toBe(true);
    });

    it("returns an array with length equal to the number passed in", function(){
      var num = 5
      expect($scope.toRepeat(num).length).toBe(num);
    });

  });

  describe("$scope.remainingStars", function() {

    it("returns a number", function() {
      expect(typeof $scope.remainingStars(2)).toBe('number');
    });
  })

});
