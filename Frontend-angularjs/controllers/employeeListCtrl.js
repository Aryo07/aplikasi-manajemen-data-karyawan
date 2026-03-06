(function () {
  'use strict';

  angular
    .module('employeeApp')
    .controller('EmployeeListCtrl', EmployeeListCtrl);

  EmployeeListCtrl.$inject = ['$scope', 'employeeService'];

  function EmployeeListCtrl($scope, employeeService) {
    $scope.employees = [];
    $scope.loading = true;
    $scope.alert = null;
    $scope.searchQuery = '';

    // Muat semua karyawan
    function loadEmployees() {
      $scope.loading = true;
      employeeService.getAll()
        .then(function (res) {
          $scope.employees = res.data;
          $scope.loading = false;
          computeStats();
        })
        .catch(function (err) {
          $scope.alert = { type: 'danger', msg: 'Gagal memuat data karyawan: ' + (err.data && err.data.error || err.statusText) };
          $scope.loading = false;
        });
    }

    function computeStats() {
      $scope.totalEmployees = $scope.employees.length;

      var positions = {};
      var totalSalary = 0;
      $scope.employees.forEach(function (e) {
        positions[e.Position] = true;
        totalSalary += parseFloat(e.Salary) || 0;
      });
      $scope.totalPositions = Object.keys(positions).length;
      $scope.avgSalary = $scope.employees.length > 0
        ? (totalSalary / $scope.employees.length)
        : 0;
    }

    // Format gaji ke Rupiah
    $scope.formatSalary = function (salary) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        maximumFractionDigits: 0
      }).format(salary);
    };

    // Format tanggal
    $scope.formatDate = function (dateStr) {
      if (!dateStr) return '-';
      return new Date(dateStr).toLocaleDateString('id-ID', {
        day: '2-digit', month: 'short', year: 'numeric'
      });
    };

    // Hapus karyawan
    $scope.deleteEmployee = function (employee) {
      if (!confirm('Hapus karyawan "' + employee.Name + '"? Tindakan ini tidak dapat dibatalkan.')) {
        return;
      }
      employeeService.remove(employee.EmployeeID)
        .then(function () {
          $scope.alert = { type: 'success', msg: 'Karyawan "' + employee.Name + '" berhasil dihapus.' };
          loadEmployees();
          setTimeout(function () { $scope.$apply(function () { $scope.alert = null; }); }, 3000);
        })
        .catch(function (err) {
          $scope.alert = { type: 'danger', msg: 'Gagal menghapus karyawan: ' + (err.data && err.data.error || err.statusText) };
        });
    };

    // Filter pencarian (client-side)
    $scope.filteredEmployees = function () {
      if (!$scope.searchQuery) return $scope.employees;
      var q = $scope.searchQuery.toLowerCase();
      return $scope.employees.filter(function (e) {
        return (e.Name && e.Name.toLowerCase().includes(q)) ||
               (e.Position && e.Position.toLowerCase().includes(q));
      });
    };

    loadEmployees();
  }
})();
