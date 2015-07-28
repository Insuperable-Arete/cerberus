var app = angular.module('app', [
  'app.homeController',
  'app.detailsController',
  'app.detailsSidebarController',
  'app.googleMapController',
  'app.typeAheadController',
  'app.mapService',
  'app.animationService',
  'app.bestSpotService',
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
    .state('default', {
      url: '/',
    })
  $stateProvider
    .state('details', {
      url: '/details',
      controller: 'DetailsSidebarController'
    })
});
