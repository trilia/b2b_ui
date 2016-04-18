angular.module('TriliaApp').controller('CustomerDetailsController', function($rootScope, $scope, $http, $timeout) {
    $scope.$on('$viewContentLoaded', function() {   
        //App.initAjax(); // initialize core components
        //Layout.setSidebarMenuActiveLink('set', $('#sidebar_menu_link_profile')); // set profile link active in sidebar menu 
    });

    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageBodySolid = true;
    $rootScope.settings.layout.pageSidebarClosed = false;
    
    $scope.tabs = [{
        title: 'PROFILE INFORMATION',
        template: '/views/customers/partials/_profile_information.html',
        disabled: true
    },
    {
        title: 'ORDER HISTORY',
        template: '/views/customers/partials/_order_history.html',
        
    }];
}); 
