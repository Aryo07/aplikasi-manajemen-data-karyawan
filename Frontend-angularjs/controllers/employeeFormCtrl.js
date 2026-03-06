(function () {
  'use strict';

  angular
    .module('employeeApp')
    .controller('EmployeeFormCtrl', EmployeeFormCtrl);

  EmployeeFormCtrl.$inject = ['$scope', '$routeParams', '$location', 'employeeService'];

  function EmployeeFormCtrl($scope, $routeParams, $location, employeeService) {
    var id = $routeParams.id;
    $scope.isEdit = !!id;
    $scope.loading = false;
    $scope.submitting = false;
    $scope.alert = null;

    $scope.employee = {
      name: '',
      position: '',
      salary: null
    };

    $scope.errors = {};

    // Jika mode edit, ambil data karyawan
    if ($scope.isEdit) {
      $scope.loading = true;
      employeeService.getById(id)
        .then(function (res) {
          var data = res.data;
          $scope.employee = {
            name: data.Name,
            position: data.Position,
            salary: parseFloat(data.Salary)
          };
          $scope.loading = false;
        })
        .catch(function (err) {
          $scope.alert = { type: 'danger', msg: 'Gagal memuat data karyawan.' };
          $scope.loading = false;
        });
    }

    // Validasi form
    function validate() {
      $scope.errors = {};
      var valid = true;

      if (!$scope.employee.name || $scope.employee.name.trim() === '') {
        $scope.errors.name = 'Nama karyawan tidak boleh kosong.';
        valid = false;
      } else if ($scope.employee.name.trim().length < 2) {
        $scope.errors.name = 'Nama minimal 2 karakter.';
        valid = false;
      }

      if (!$scope.employee.position || $scope.employee.position.trim() === '') {
        $scope.errors.position = 'Posisi/jabatan tidak boleh kosong.';
        valid = false;
      }

      var salary = parseFloat($scope.employee.salary);
      if (isNaN(salary) || salary <= 0) {
        $scope.errors.salary = 'Gaji harus lebih dari 0.';
        valid = false;
      }

      return valid;
    }

    // Submit form
    $scope.submit = function () {
      if (!validate()) return;

      $scope.submitting = true;
      $scope.alert = null;

      var payload = {
        name: $scope.employee.name.trim(),
        position: $scope.employee.position.trim(),
        salary: parseFloat($scope.employee.salary)
      };

      var request = $scope.isEdit
        ? employeeService.update(id, payload)
        : employeeService.create(payload);

      request
        .then(function () {
          $location.path('/').search({ success: $scope.isEdit ? 'updated' : 'created' });
        })
        .catch(function (err) {
          $scope.alert = {
            type: 'danger',
            msg: 'Gagal menyimpan data: ' + (err.data && err.data.error || err.statusText || 'Unknown error')
          };
          $scope.submitting = false;
        });
    };

    // Batal
    $scope.cancel = function () {
      $location.path('/');
    };
  }
})();
