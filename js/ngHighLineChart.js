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
            renderTo: 'high-line-chart',
            defaultSeriesType: 'column'
        },
        title: {
            text: 'Placed By Advisor'
        },
        xAxis: {
            categories: ['John Jenkins', 'Steve Smith', 'Will Douglas', 'Dustin Johnson', 'Suzy Abbott', 'Wendy Jones'],
            min: 0,
            max: 4

        },
        yAxis: {
            min: 0
        },
        legend: {
            shadow: true,
            itemHoverStyle: {
                cursor: "default"
            },
            itemDistance: 50
            //title: {
              //  text: '<span style="font-size: 10px; color: #666; font-weight: normal">Click to hide</span>',
                //    style: {
                  //      fontStyle: 'italic'
                   // }
                //},
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
            name: 'Unemployed',
            color: '#D70014',
            selected: true,
            data: [100, 100, 120, 55, 35, 189]},
        {
            name: 'Placed In Related',
            color: '#6CBA16',
            selected: true,
            data: [80, 108, 15, 74, 48, 88]},
        {
            name: 'Placed In Unrelated',
            color: '#FFA501',
            selected: true,
            data: [17, 22, 187, 70, 75, 35]},
        {
            name: 'Except',
            color: '#2F7DC4',
            selected: true,
            data: [10, 0, 19, 65, 25, 674]}],
	    
	    scrollbar: {
            enabled:true,
			barBackgroundColor: 'lightgray',
			//barBorderRadius: 7,
			//barBorderWidth: 0,
			//buttonBackgroundColor: 'gray',
			//buttonBorderWidth: 0,
			//buttonArrowColor: 'yellow',
			//buttonBorderRadius: 0,
			//rifleColor: 'yellow',
			//trackBackgroundColor: 'red',
			//trackBorderWidth: 1,
			//trackBorderColor: 'silver',
			//trackBorderRadius: 7
	    }
	});
          }
        };
    }
]);
