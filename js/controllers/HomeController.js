angular.module('TriliaApp').controller('HomeController', function($rootScope, $scope, $http, $timeout, FileUploader) {
    
    // set sidebar closed and body solid layout mode
    $rootScope.settings.layout.pageContentWhite = true;
    $rootScope.settings.layout.pageBodySolid = false;
    
    var uploader = $scope.uploader = new FileUploader({
      url: '/assets/global/plugins/angularjs/plugins/angular-file-upload/upload.php'
    });
});