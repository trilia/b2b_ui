TriliaApp.directive('ngHighLineChart', ['$rootScope', '$compile',
    function($rootScope, $compile) {
        return {
          restrict: 'E',
          link: function (scope, element, attrs) {
            var html = '<div id="high-line-chart"></div>';
            var el = $compile(html)(scope);
            element.append(el);
            $('#high-line-chart').highcharts({
              
              chart: {
            marginRight: 0
        },
              xAxis: {
                  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
              },
              yAxis: {
                  title: {
                      text: ''
                  },
                  plotLines: [{
                      value: 0,
                      width: 1,
                      color: '#808080'
                  }]
              },
              tooltip: {
                  valueSuffix: ' Orders'
              },
              legend: {
                align: 'left',
                verticalAlign: 'top',
                layout: 'horizontal',
                x: 0,
                y: 100
              },
              plotOptions: {
                column: {
                    pointPadding: 0.2,
                    borderWidth: 0.5
                },
                series: {
                  showCheckbox: true,
                  events: {
                      checkboxClick: function (event) {
                          if (event.checked) {
                              this.show();
                              this.legendSymbol.show();
                          } else {
                              this.hide();
                              this.legendSymbol.hide();
                          }
                      },
                      legendItemClick: function() {
                          return false;
                      }
                  }
                }
              },
              series: [{
                  name: 'Orders',
                  data: [200, 300, 150, 500, 700, 725, 120]
              }, {
                  name: 'Stock',
                  data: [250, 200, 250, 550, 600, 500, 750]
              }]
          });
          }
        };
    }
]);
