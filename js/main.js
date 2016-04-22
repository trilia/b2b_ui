/***
Trilia AngularJS App Main Script
***/

/* Trilia App */
var TriliaApp = angular.module("TriliaApp", [
    "ui.router", 
    "ui.bootstrap", 
    "oc.lazyLoad",  
    "ngSanitize"
]); 

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
TriliaApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/
/**
`$controller` will no longer look for controllers on `window`.
The old behavior of looking on `window` for controllers was originally intended
for use in examples, demos, and toy apps. We found that allowing global controller
functions encouraged poor practices, so we resolved to disable this behavior by
default.

To migrate, register your controllers with modules rather than exposing them
as globals:

Before:

```javascript
function MyController() {
  // ...
}
```

After:

```javascript
angular.module('myApp', []).controller('MyController', [function() {
  // ...
}]);

Although it's not recommended, you can re-enable the old behavior like this:

```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
TriliaApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

/* Setup global settings */
TriliaApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        assetsPath: '../assets',
        globalPath: '../assets/global',
        layoutPath: '../assets/layouts/layout',
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
TriliaApp.controller('AppController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
    });
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial 
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
TriliaApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
TriliaApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
TriliaApp.controller('QuickSidebarController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
       setTimeout(function(){
            QuickSidebar.init(); // init quick sidebar        
        }, 2000)
    });
}]);

/* Setup Layout Part - Theme Panel */
TriliaApp.controller('ThemePanelController', ['$scope', function($scope) {    
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
TriliaApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
TriliaApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/dashboard");  
    
    $stateProvider

      .state('home', {
          url: "/home",
          templateUrl: "views/home.html",
          data: {pageTitle: 'Home'},
          controller: "HomeController",
          resolve: {
              deps: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load([{
                      name: 'angularFileUpload',
                      files: [
                          '/assets/global/plugins/angularjs/plugins/angular-file-upload/angular-file-upload.min.js',
                          '/assets/global/plugins/highcharts/js/highcharts.src.js',
                          '/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.css',
                          '/assets/global/plugins/bootstrap-switch/css/bootstrap-switch.min.css',
                          '/assets/global/plugins/bootstrap-markdown/css/bootstrap-markdown.min.css',
                          '/assets/global/plugins/typeahead/typeahead.css',

                          '/assets/global/plugins/fuelux/js/spinner.min.js',
                          '/assets/global/plugins/bootstrap-fileinput/bootstrap-fileinput.js',
                          '/assets/global/plugins/jquery-inputmask/jquery.inputmask.bundle.min.js',
                          '/assets/global/plugins/jquery.input-ip-address-control-1.0.min.js',
                          '/assets/global/plugins/bootstrap-pwstrength/pwstrength-bootstrap.min.js',
                          '/assets/global/plugins/bootstrap-switch/js/bootstrap-switch.min.js',
                          '/assets/global/plugins/bootstrap-maxlength/bootstrap-maxlength.min.js',
                          '/assets/global/plugins/bootstrap-touchspin/bootstrap.touchspin.js',
                          '/assets/global/plugins/typeahead/handlebars.min.js',
                          '/assets/global/plugins/typeahead/typeahead.bundle.min.js',
                          '/assets/pages/scripts/components-form-tools-2.min.js',
                          'js/ngHighLineChart.js'
                      ] 
                  }, {
                      name: 'TriliaApp',
                      files: [
                          'js/controllers/HomeController.js',
                      ]
                  }]);
              }]
          }
      })
      
      .state('dashboard', {
          url: "/dashboard",
          templateUrl: "views/dashboard.html",            
          data: {pageTitle: 'Dashboard Template'},
          controller: "DashboardController",
          resolve: {
              deps: ['$ocLazyLoad', function($ocLazyLoad) {
                  return $ocLazyLoad.load({
                      name: 'TriliaApp',
                      insertBefore: '#ng_load_plugins_before', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                      files: [
                          '/assets/global/plugins/highcharts/js/highcharts.src.js',
                          'js/ngHighLineChart.js',
                          'js/controllers/DashboardController.js',
                      ] 
                  });
              }]
          }
      })
      
      .state("products", {
          url: "/products",
          templateUrl: "views/products/products.html",
          data: {pageTitle: 'Product Management'},
          controller: "ProductController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/ProductController.js'
                  ]
              });
            }]
          }
      })
      
      .state("add-product", {
          url: "/add-product",
          templateUrl: "views/products/add_product.html",
          data: {pageTitle: 'Add Product'},
          controller: "AddProductController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/AddProductController.js'
                  ]
              });
            }]
          }
      })
      
      .state("orders", {
          url: "/orders",
          templateUrl: "views/orders/main.html",
          data: {pageTitle: 'Order Management'},
          controller: "OrderController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/OrderController.js'
                  ]
              });
            }]
          }
      })
      
      .state("orders.dashboard", {
          url: "/dashboard",
          templateUrl: "views/orders/dashboard.html",
          data: {pageTitle: 'Order Dashboard'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/highcharts/js/highcharts.src.js',
                      'js/ngHighDonutChart.js'
                  ]
              });
            }]
          }
      })

      .state("orders.processing", {
          url: "/processing",
          templateUrl: "views/orders/processing.html",
          data: {pageTitle: 'Order Processing'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/highcharts/js/highcharts.src.js',
                      'js/ngHighLineChart.js',
                      'js/ngHighDonutChart.js'
                  ]
              });
            }]
          }
      })
      
      .state("orders.calendar-view", {
          url: "/calendar-view",
          templateUrl: "views/orders/calendar-view.html",
          data: {pageTitle: 'Order Processing Calendar View'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/fullcalendar/fullcalendar.min.css',
                      '/assets/global/plugins/fullcalendar/lib/moment.min.js',
                      '/assets/global/plugins/fullcalendar/fullcalendar.min.js',
                      'js/ngCalendar.js'
                  ]
              });
            }]
          }
      })

      .state("orders.warehouse_mgmt", {
          url: "/warehouse_mgmt",
          templateUrl: "views/orders/warehouse_mgmt.html",
          data: {pageTitle: 'Order Management'}      
      })
      
      .state("orders.packaging", {
          url: "/packaging",
          templateUrl: "views/orders/packaging.html",
          data: {pageTitle: 'Packaging'}      
      })
      
      .state("orders.shipping", {
          url: "/shipping",
          templateUrl: "views/orders/shipping.html",
          data: {pageTitle: 'Shipping'}      
      })
      
      .state("partners", {
          url: "/partners",
          templateUrl: "views/partners/main.html",
          data: {pageTitle: 'Partner Management'},
          controller: "GeneralPageController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("partners.inventory", {
          url: "/inventory",
          templateUrl: "views/partners/inventory.html",
          data: {pageTitle: 'Inventory'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })

      .state("partners.logistics", {
          url: "/logistics",
          templateUrl: "views/partners/logistics.html",
          data: {pageTitle: 'Logistics'},
          
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                    'js/ngGoogleMap.js',
                    'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("setup", {
          url: "/setup",
          templateUrl: "views/setup/main.html",
          data: {pageTitle: 'Setup Management'},
          controller: "GeneralPageController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("setup.business", {
          url: "/business",
          templateUrl: "views/setup/business.html",
          data: {pageTitle: 'Business'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })

      .state("setup.employees-add", {
          url: "/employees-add",
          templateUrl: "views/setup/employees-add.html",
          data: {pageTitle: 'Emplyees Setup'},
          
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                    'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("setup.employees-add1", {
          url: "/employees-add1",
          templateUrl: "views/setup/employees-add1.html",
          data: {pageTitle: 'Emplyees Setup'},
          
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                    'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("setup.employees-add2", {
          url: "/employees-add2",
          templateUrl: "views/setup/employees-add2.html",
          data: {pageTitle: 'Emplyees Setup'},
          
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                    'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("setup.chart", {
          url: "/chart",
          templateUrl: "views/setup/chart.html",
          data: {pageTitle: 'Emplyees Chart'},
          
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                    '/assets/global/plugins/org-chart/jquery.orgchart.css',
                    '/assets/global/plugins/org-chart/jquery.orgchart.js',
                    'js/controllers/GeneralPageController.js',
                    'js/orgChart.js'
                  ]
              });
            }]
          }
      })
      
      .state("setup.role-access", {
          url: "/role-access",
          templateUrl: "views/setup/role-access.html",
          data: {pageTitle: 'Role Access Settings'},
          
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                    'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("customers", {
          url: "/customers",
          templateUrl: "views/customers/main.html",
          data: {pageTitle: 'Customers Management'},
          controller: "CustomersController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/CustomersController.js'
                  ]
              });
            }]
          }
      })
      
      .state("customers.dashboard", {
          url: "/dashboard",
          templateUrl: "views/customers/dashboard.html",
          data: {pageTitle: 'Order Dashboard'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/highcharts/js/highcharts.src.js',
                      'js/ngHighDonutChart.js'
                  ]
              });
            }]
          }
      })

      .state("customers.list", {
          url: "/list",
          templateUrl: "views/customers/list.html",
          data: {pageTitle: 'Customers List'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/ProductController.js'
                  ]
              });
            }]
          }
      })

      .state("customers.details", {
          url: "/details",
          templateUrl: "views/customers/details.html",
          data: {pageTitle: 'Customers Details'},
          controller: 'CustomerDetailsController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/CustomerDetailsController.js'
                  ]
              });
            }]
          }
      })
      
      .state("finance", {
          url: "/finance",
          templateUrl: "views/finance/main.html",
          data: {pageTitle: 'Finance Management'},
          controller: "GeneralPageController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("finance.dashboard", {
          url: "/dashboard",
          templateUrl: "views/finance/dashboard.html",
          data: {pageTitle: 'Finance Dashboard'},
          
      })
      
      .state("finance.payment", {
          url: "/payment",
          templateUrl: "views/finance/payment.html",
          data: {pageTitle: 'Finance Dashboard'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/CustomerDetailsController.js'
                  ]
              });
            }]
          }
      })
      
      .state("marketing-sales", {
          url: "/marketing-sales",
          templateUrl: "views/marketing_sales/main.html",
          data: {pageTitle: 'Marketing Management'},
          controller: "GeneralPageController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("marketing-sales.dashboard", {
          url: "/dashboard",
          templateUrl: "views/marketing_sales/dashboard.html",
          data: {pageTitle: 'Marketing Dashboard'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/highcharts/js/highcharts.src.js',
                      'js/ngHighLineChart.js',
                      'js/ngHighDonutChart.js'
                  ]
              });
            }]
          }
      })
      
      .state("marketing-sales.reorder", {
          url: "/reorder",
          templateUrl: "views/marketing_sales/reorder.html",
          data: {pageTitle: 'Marketing Reorder'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before'
              });
            }]
          }
      })
      
      .state("marketing-sales.list", {
          url: "/list",
          templateUrl: "views/marketing_sales/list.html",
          data: {pageTitle: 'Marketing List'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/GeneralPageController.js'
                  ]
              });
            }]
          }
      })
      
      .state("marketing-sales.details", {
          url: "/details",
          templateUrl: "views/marketing_sales/details.html",
          data: {pageTitle: 'Marketing Details'}
      })
      
      .state("marketing-sales.details1", {
          url: "/details1",
          templateUrl: "views/marketing_sales/details1.html",
          data: {pageTitle: 'Marketing Details1'}
      })
      
      .state("customer-care", {
          url: "/customer-care",
          templateUrl: "views/customer-care/main.html",
          data: {pageTitle: 'Customer Care'},
          controller: "CustomerCareController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/CustomerCareController.js'
                  ]
              });
            }]
          }
      })

      .state("customer-care.list", {
          url: "/list",
          templateUrl: "views/customer-care/list.html",
          data: {pageTitle: 'Customer Care'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/CustomerCareController.js'
                  ]
              });
            }]
          }
      })

      .state("customer-care.details", {
          url: "/details",
          templateUrl: "views/customer-care/details.html",
          data: {pageTitle: 'Customer Care Details'},
          controller: 'CustomerCareDetailsController',
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/bootstrap-datepicker/css/bootstrap-datepicker3.min.css',
                      '/assets/global/plugins/datatables/plugins/bootstrap/datatables.bootstrap.css',
                      '/assets/global/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js',
                      '/assets/global/plugins/datatables/datatables.all.min.js',
                      '/assets/global/scripts/datatable.js',
                      'js/scripts/table-ajax.js',
                      'js/controllers/CustomerCareDetailsController.js'
                  ]
              });
            }]
          }
      })
      
      .state("access", {
          url: "/access",
          templateUrl: "views/access/main.html",
          data: {pageTitle: 'Access Management'},
          controller: "RoleController",
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      'js/controllers/RoleController.js'
                  ]
              });
            }]
          }
      })
      
      .state("access.receiving", {
          url: "/receiving",
          templateUrl: "views/access/receiving.html",
          data: {pageTitle: 'Receiving'},
          resolve: {
            deps: ['$ocLazyLoad', function($ocLazyLoad) {
              return $ocLazyLoad.load({
                  name: 'TriliaApp',  
                  insertBefore: '#ng_load_plugins_before', // load the above css files before '#ng_load_plugins_before'
                  files: [
                      '/assets/global/plugins/tree-view/Treant.css',
                      '/assets/global/plugins/tree-view/basic-example.css',
                      '/assets/global/plugins/tree-view/raphael.js',
                      '/assets/global/plugins/tree-view/Treant.js',
                      '/assets/global/plugins/tree-view/basic-example.js',
                      'js/hierarchy.js'
                  ]
              });
            }]
          }
      })

      .state("access.storage", {
          url: "/storage",
          templateUrl: "views/access/storage.html",
          data: {pageTitle: 'Storage'}
      })

      .state("access.channel", {
          url: "/sales-channel",
          templateUrl: "views/access/sales_channel.html",
          data: {pageTitle: 'Sales Channel'}
      })
      
      .state("access.processing", {
          url: "/processing",
          templateUrl: "views/access/processing.html",
          data: {pageTitle: 'Processing'}
      })
      
      .state("access.shipment", {
          url: "/shipment",
          templateUrl: "views/access/shipment.html",
          data: {pageTitle: 'Shipment'}
      })
      
      .state("access.defects", {
          url: "/defects",
          templateUrl: "views/access/defects.html",
          data: {pageTitle: 'Defects'}
      })
}]);

/* Init global settings and run the app */
TriliaApp.run(["$rootScope", "settings", "$state", function($rootScope, settings, $state) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
}]);