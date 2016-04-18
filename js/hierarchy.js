TriliaApp.directive('ngHierarchy', ['$rootScope', '$compile',
    function($rootScope, $compile) {
        return {
          restrict: 'E',
          link: function (scope, element, attrs) {
            var html = '<div class="treeStructure" id="basic-example">Anurag</div>';
            var el = $compile(html)(scope);
            element.append(el);
            new Treant( chart_config );
          }
        };
    }
]);
