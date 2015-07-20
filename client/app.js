var app = angular.module('app', [
  'app.homeController',
  'app.detailsController',
  'app.googleMapController',
  'app.mapService',
  'd3',
  'ui.router',
  'ui.bootstrap'
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
