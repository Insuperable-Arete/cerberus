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
  });

});

describe("HomeController", function(){
  var $controller;
  var $scope = {};

  beforeEach(module('app'));
  beforeEach(inject(function(_$controller_) {
    $controller = _$controller_;
  }));
  beforeEach(inject(function() {
    var controller = $controller('HomeController', {
      $scope: $scope
    });
  }));

  // describe("$scope.getBestWavesFromLoc", function() {

  //   it("should be a function", function() {
  //     // expect(typeof $scope.getBestWavesFromLoc).toBe('function');
  //     expect(true).toBe(true);
  //   });

  // });

});

describe("GoogleMapController", function() {
  beforeEach(module('app'));

  var $controller;
  var MapService;
  var d3Service;

  beforeEach(inject(function(_$controller_, _$modal_, _MapService_, _d3Service_) {
    $controller = _$controller_;
    $modal = _$modal_;
    MapService = _MapService_;
    d3Service = _d3Service_;
  }));

  var $scope = {};
  //
  beforeEach(inject(function() {
    var controller = $controller('GoogleMapController', {
      $scope: $scope,
      $modal: $modal,
      MapService: MapService,
      d3Service: d3Service
    })
  }))
  describe("$scope.open", function() {
    it("is a function", function() {
      expect(typeof $scope.open).toBe('function');
    })
  })
});

describe("MapService", function() {
  beforeEach(module('app'));

  var $http;
  var $rootScope;
  var MapService;

  beforeEach(inject(function(_$http_, _$rootScope_, _MapService_) {
    $http = _$http_;
    $rootScope = _$rootScope_;
    MapService = _MapService_;
  }))

  describe("getBeachData", function() {
    it("is a function", function() {
      expect(typeof MapService.getBeachData).toBe('function');
    })
    it("GETs beach data object", function() {
      expect(typeof MapService.getBeachData()).toBe('object');
    })
  })
});
