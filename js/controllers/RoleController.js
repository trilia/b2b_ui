angular.module('TriliaApp').controller('RoleController', function($rootScope, $scope, $http, $timeout) {
    $scope.setAuth(true);
    $scope.$on('$viewContentLoaded', function() {   
        //App.initAjax(); // initialize core components
        //Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu 
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;
}); 
