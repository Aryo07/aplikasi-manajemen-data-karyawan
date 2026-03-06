(function () {
  'use strict';

  angular
    .module('employeeApp')
    .service('employeeService', employeeService);

  employeeService.$inject = ['$http'];

  function employeeService($http) {
    var BASE_URL = 'http://localhost:3000/api/employees';

    // GET semua karyawan
    this.getAll = function () {
      return $http.get(BASE_URL);
    };

    // GET karyawan berdasarkan ID
    this.getById = function (id) {
      return $http.get(BASE_URL + '/' + id);
    };

    // POST tambah karyawan baru
    this.create = function (data) {
      return $http.post(BASE_URL, data);
    };

    // PUT update karyawan
    this.update = function (id, data) {
      return $http.put(BASE_URL + '/' + id, data);
    };

    // DELETE hapus karyawan
    this.remove = function (id) {
      return $http.delete(BASE_URL + '/' + id);
    };
  }
})();
