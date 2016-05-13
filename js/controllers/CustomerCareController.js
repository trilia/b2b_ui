angular.module('TriliaApp').controller('CustomerCareController', function($rootScope, $scope, $http, $timeout) {
    $scope.setAuth(true);
    $scope.$on('$viewContentLoaded', function() {
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
});