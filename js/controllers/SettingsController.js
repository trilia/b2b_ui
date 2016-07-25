angular.module('TriliaApp').controller('SettingsController', function($rootScope, $scope, $http, $timeout) {
    $scope.setAuth(true);
    $scope.$on('$viewContentLoaded', function() {   
        // initialize core components
        App.initAjax();
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
});