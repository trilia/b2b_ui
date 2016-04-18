TriliaApp.directive('ngHighDonutChart', ['$rootScope', '$compile',
    function($rootScope, $compile) {
        return {
          restrict: 'E',
          link: function (scope, element, attrs) {
            var html = '<div id="high-donut-chart"></div>';
            var el = $compile(html)(scope);
            element.append(el);
            chart = new Highcharts.Chart({
            chart: {
                renderTo: 'high-donut-chart',
                type: 'pie'
            },
            title: {
                text: 'Stock Analysis'
            },
            yAxis: {
                title: {
                    text: 'Total percent market share'
                }
            },
            plotOptions: {
                pie: {
                    shadow: false
                }
            },
            tooltip: {
                formatter: function() {
                    return '<b>'+ this.point.name +'</b>: '+ this.y +' %';
                }
            },
            series: [{
                name: 'Browsers',
                data: [["Out of Stock",6],["Below Reorder",4],["Nearing Reorder",7],["Optimium Level",7],["Excess",7]],
                size: '60%',
                innerSize: '20%',
                showInLegend:true,
                dataLabels: {
                    enabled: false
                }
            }]
        });
    //});
          }
        };
    }
]);
