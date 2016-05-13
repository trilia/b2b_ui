angular.module('TriliaApp').controller('LoginController', function($rootScope, $scope, $http, $timeout) {
  $scope.setAuth(false);
  $scope.frm = 'login';
  
  $scope.setForm = function(data) {
    $scope.frm = data;
  }
});