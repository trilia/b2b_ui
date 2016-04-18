TriliaApp.directive('orgChart', ['$rootScope', '$compile',
    function($rootScope, $compile) {
      return {
        restrict: 'E',
        link: function (scope, element, attrs) {
          var html = '<div id="orgChartContainer"><div id="orgChart"></div></div><div id="consoleOutput"></div>';
          var el = $compile(html)(scope);
          element.append(el);
          var testData = [{id: 1, name: 'Trilia', parent: 0},
            {id: 2, name: 'Mr. Shinde (cxo)', parent: 1},
            {id: 3, name: 'Mr. Rao (CEO)', parent: 1},
            {id: 4, name: 'Mr. Chakravorthy (Director)', parent: 1},
            {id: 6, name: 'Mr. Jolie (Manager)', parent: 3},
            {id: 7, name: 'Mr. Dsouza', parent: 3},
            {id: 8, name: 'Mr. Khan', parent: 3},
            {id: 9, name: 'Mr. Hudson', parent: 3},
            {id: 10, name: 'Mr. Husain', parent: 3}];
          $(function(){
            org_chart = $('#orgChart').orgChart({
              data: testData,
              showControls: true,
              allowEdit: true,
              onAddNode: function(node){ 
                  log('Created new node on node '+node.data.id);
                  org_chart.newNode(node.data.id); 
              },
              onDeleteNode: function(node){
                  log('Deleted node '+node.data.id);
                  org_chart.deleteNode(node.data.id); 
              },
              onClickNode: function(node){
                  log('Clicked node '+node.data.id);
              }
            });
          });
          // just for example purpose
          function log(text){
              $('#consoleOutput').append('<p>'+text+'</p>')
          }
        }
      };
    }
]);
