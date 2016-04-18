/* Setup general page controller */
angular.module('TriliaApp').controller('GeneralPageController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.frmDetails = false;
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	App.initAjax();

    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
    });
    
    $scope.ltabs = [{
        title: 'LOGISTIC INFORMATION',
        template: '/views/partners/partials/_logistic_information.html',
        disabled: true
    },
    {
        title: 'LEGAL INFORMATION',
        template: '/views/partners/partials/_legal_information.html',
        
    },
    {
        title: 'BANK DETAILS',
        template: '/views/partners/partials/_bank_details.html',
        
    },
    {
        title: 'OPERATIONS',
        template: '/views/partners/partials/_operations.html',
        
    },
    {
        title: 'LINTEGRATION DETAILS',
        template: '/views/partners/partials/_integration_details.html',
        
    }];
    
    $scope.btabs = [{
        title: 'MERCHANT INFORMATION',
        template: '/views/setup/partial/merchant-info.html',
        disabled: true
    },
    {
        title: 'BILL PLAN',
        template: '/views/setup/partial/merchant-bill-plan.html',
        
    },
    {
        title: 'LEGAL INFORMATION',
        template: '/views/setup/partial/merchant-legal-info.html',
        
    },
    {
        title: 'BANK DETAILS',
        template: '/views/setup/partial/business-bank-details.html',
        
    }];
    
    $scope.loadForm = function() {
      $scope.frmDetails = $scope.frmDetails == false ? true : false;
    }
    
    $scope.roles = [{name: 'Inventory 1'}, {name: 'Inventory 2'}, {name: 'Inventory 3'}, {name: 'Inventory 4'}];
}]);
