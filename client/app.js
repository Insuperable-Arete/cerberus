var app = angular.module('app', [
  'app.homeController',
  'app.detailsController',
  'app.googleMapController',
  'app.mapService',
  'app.directives',
  'd3',
  'ui.router',
  'ui.bootstrap'
])
// TODO: fix router when expanding beyond our only view
// .config(function($urlRouterProvider, $stateProvider) {
//   $urlRouterProvider.otherwise('/');

//   $stateProvider
//   .state('home', {
//     url: '/',
//     templateUrl: '../html/index.html',
//     controller: 'HomeController'
//   });
// });
