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
          height: 2,
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

  describe("$scope.windSpeedClass", function() {
    it("returns a string", function() {
      expect(typeof $scope.windSpeedClass()).toBe('string');
    })
    it("applies a specifier", function() {
      expect($scope.windSpeedClass('-2').slice(-2)).toBe('-2')
    })
    it("returns when specifier is not a string", function() {
      expect($scope.windSpeedClass(-2)).toBe(null);
    })
    it("plays the fast animation when wind speeds are greater than 10", function() {
      $scope.windSpeed = 11;
      expect($scope.windSpeedClass().slice(-5)).toBe('-fast');
    });
    it("plays the slow animation when wind speeds are less than 4", function() {
      $scope.windSpeed = 3;
      expect($scope.windSpeedClass().slice(-5)).toBe('-slow');
    });
    it("plays the appropriate animation with a specifier", function() {
      $scope.windSpeed = 3;
      expect($scope.windSpeedClass('-2').slice(-7)).toBe('-2-slow');
    });
  });

  describe("$scope.swellHeightClass", function() {
    it("returns a string", function() {
      expect(typeof $scope.swellHeightClass()).toBe('string');
    })
    it("applies a specifier", function() {
      expect($scope.swellHeightClass('-2').slice(-2)).toBe('-2')
    })
    it("returns when specifier is not a string", function() {
      expect($scope.swellHeightClass(-2)).toBe(null);
    })
  });

  describe("$scope.swellPeriodClass", function() {
    it("returns a string", function() {
      expect(typeof $scope.swellPeriodClass()).toBe('string');
    })
    it("applies a specifier", function() {
      expect($scope.swellPeriodClass('-2').slice(-2)).toBe('-2')
    })
    it("returns when specifier is not a string", function() {
      expect($scope.swellPeriodClass(-2)).toBe(null);
    })
  });
});

describe("HomeController", function(){
  var $controller;
  var $scope = {};
  var $rootScope;

  beforeEach(module('app'));

  beforeEach(inject(function(_$controller_, _$rootScope_) {
    $controller = _$controller_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();
  }));


  beforeEach(inject(function() {
    var controller = $controller('HomeController', {
      $scope: $scope
    });
  }));

  describe('$scope.toggleClass', function() {
    it('sets $scope.sideMenu to true on first call', function() {
      $scope.toggleClass();
      expect($scope.sideMenu).toBe(true);
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
