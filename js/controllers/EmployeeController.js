/* Setup general page controller */
angular.module('TriliaApp').controller('EmployeeController', ['$rootScope', '$scope', 'settings', '$location', function($rootScope, $scope, settings, $location) {
  $scope.setAuth(true);
  $scope.$on('$viewContentLoaded', function() {
    // initialize core components

    // set default layout mode
    $rootScope.settings.layout.pageContentWhite = true;
      $rootScope.settings.layout.pageBodySolid = false;
      $rootScope.settings.layout.pageSidebarClosed = false;
  });

  $scope.load = function (path) {
    if(path == 'add-employee') {
      $location.path('setup/employees-add');
    } else if(path == 'roles') {
      $location.path('setup/role-access');
    } else if(path == 'chart') {
      $location.path('setup/chart');
    }
  }
}]);
