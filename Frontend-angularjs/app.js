(function () {
  'use strict';

  angular
    .module('employeeApp', ['ngRoute'])
    .config(routeConfig);

  routeConfig.$inject = ['$routeProvider', '$locationProvider'];

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/employee-list.html',
        controller: 'EmployeeListCtrl'
      })
      .when('/create', {
        templateUrl: 'views/employee-form.html',
        controller: 'EmployeeFormCtrl'
      })
      .when('/edit/:id', {
        templateUrl: 'views/employee-form.html',
        controller: 'EmployeeFormCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();
