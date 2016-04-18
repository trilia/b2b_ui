TriliaApp.directive('ngGoogleMap', ['$rootScope', '$compile',
    function($rootScope, $compile) {
        return {
          restrict: 'E',
          link: function (scope, element, attrs) {
            var html = '<div id="map"></div>';
            var el = $compile(html)(scope);
            element.append(el);
            var map;
            function initMap() {
              map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: -34.397, lng: 150.644},
                zoom: 8
              });
              $('#map').css('width', '100%');
              $('#map').css('height', '400px');
            }
            initMap();
          }
        };
    }
]);
