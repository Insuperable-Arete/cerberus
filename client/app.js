var app = angularModule('app', [
  'app.mapController',
  'app.mapService'
])
.config(function($urlRouterProvider, $stateProvider) {
  urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: '..index.html',
    controller: 'HomeController'
  });
})
;
