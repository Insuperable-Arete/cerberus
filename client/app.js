var app = angular.module('app', [
  'app.homeController',
  'app.detailsController',
  'app.googleMapController',
  'app.typeAheadController',
  'app.mapService',
  'd3',
  'ui.router',
  'ui.bootstrap',
  'rzModule'
  // 'ngMock'
])
// TODO: fix router when expanding beyond our only view
.config(function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    controller: 'GoogleMapController'
  });
});
