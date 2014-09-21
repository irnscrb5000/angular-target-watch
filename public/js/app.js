(function () {
  'use strict';
  angular.module('APP', ['irn.TargetWatch'])
    .config(function ($controllerProvider) {
      $controllerProvider.register('MainController',
        ['$scope', 'IrnTargetWatch', function ($scope, TargetWatch) {

        $scope.valueToWatch = '';
        $scope.nrHits = 0;
        $scope.targetValue = '',
        $scope.nrWatchers = 100;

        $scope.createWatchers = function () {
          var onComplete = function () {
            $scope.nrHits++;
          };

          for (var i = 0; i < $scope.nrWatchers; i++) {
            TargetWatch.watch($scope, 'valueToWatch', $scope.targetValue).then(onComplete);
          }
        };

      }]);
    });
}());
