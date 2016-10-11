
// var TriliaApp = angular.module('TriliaApp', ['ngDialog']);
/* Setup general page controller */
angular.module('TriliaApp').controller('TemplatePageController', ['$rootScope', '$scope', 'settings', '$ocLazyLoad', '$compile', '$sce', '$location', function($rootScope, $scope, settings, $ocLazyLoad, $compile, $sce, $location) {
  $scope.setAuth(true);
  $scope.$on('$viewContentLoaded', function() {
    // initialize core components
    App.initAjax();
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
  //
  // $scope.openDefault = function() {
  //   alert("0");
  //   ngDialog.open({
  //     template: 'firstDialogId',
  //     scope: $scope
  //   });
  // };
  // $scope("input.make-switch").bootstrapSwitch({
  //     onText: 'normal',
  //     offText: 'abnormal',
  //     size: 'large'
  // });
}]);
