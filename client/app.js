var app = angular.module('app', [
  'app.homeController',
  'app.detailsController',
  'app.detailsSidebarController',
  'app.detailsTabController',
  'app.googleMapController',
  'app.typeAheadController',
  'app.infoController',
  'app.overviewController',
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
      templateUrl: './html/infoView.html',
      controller: 'InfoController'
    })
    .state('details', {
      url: '/details',
      templateUrl: './html/sidebarView.html',
      controller: 'DetailsSidebarController'
    })
    .state('overview', {
      url: '/overview',
      templateUrl: './html/overview.html',
      controller: 'OverviewController'
    });
});
