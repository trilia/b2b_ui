/* Setup general page controller */
angular.module('TriliaApp').controller('GeneralPageController', ['$rootScope', '$scope', 'settings', '$ocLazyLoad', '$compile', '$sce', function($rootScope, $scope, settings, $ocLazyLoad, $compile, $sce) {
    $scope.setAuth(true);
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
        title: 'BUSINESS INFORMATION',
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
    
    $scope.loadForm = function(type) {
      if(type == 'frmBankDetails') {
        $scope.frmBankDetails = $scope.frmBankDetails == false ? true : false;
      } else if(type == 'frmBillPlan') {
        $scope.frmBillPlan = $scope.frmBillPlan == false ? true : false;
      } else if(type == 'frmLegalInfo') {
        $scope.frmLegalInfo = $scope.frmLegalInfo == false ? true : false;
      } else if(type == 'frmBank') {
        $scope.frmBank = $scope.frmBank == false ? true : false;
      }
    }
    
    $scope.roles = [{name: 'Inventory 1'}, {name: 'Inventory 2'}, {name: 'Inventory 3'}, {name: 'Inventory 4'}];
    
    
    var dv= "<form action='#' class='form-horizontal'><div class='row margin-top-10'><div class='col-md-12 text-left'><label>Custom Priviledges</label></div></div><div class='row margin-top-10 margin-bottom-10'><div class='col-md-4'><select class='form-control'><option>Value</option></select></div><div class='col-md-4'><select class='form-control'><option>Is less then</option></select></div><div class='col-md-4'><input type='text' class='form-control' value='Rs. 1000'/></div></div></form>";
    $scope.htmlTooltip = $sce.trustAsHtml(dv);
}]);
