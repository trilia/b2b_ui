/* Setup general page controller */
angular.module('TriliaApp').controller('TemplatePageController', ['$rootScope', '$scope', 'settings', '$location', function($rootScope, $scope, settings, $location) {
  $scope.setAuth(true);
  $scope.$on('$viewContentLoaded', function() {
    // initialize core components

    // set default layout mode
    $rootScope.settings.layout.pageContentWhite = true;
      $rootScope.settings.layout.pageBodySolid = false;
      $rootScope.settings.layout.pageSidebarClosed = false;
  });

  $scope.load = function (path) {
    if(path == 'add_templates') {
      $location.path('add_templates');
    }
  }
}]);
