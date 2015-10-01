/**
 * Created by manueljlopez on 1/10/15.
 */
var app = angular.module("questionsApp", ['ngAnimate','ui.bootstrap']);

/**
 * @description home controller
 * @param $scope
 * @param $modal
 */
app.controller('homeController', ['$scope','$modal',function($scope,$modal,$log)
{
    $scope.animationsEnabled = true;

    $scope.open = function () {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            size: 'lg',
            templateUrl: 'modal.html',
            controller: 'ModalInstanceCtrl'
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

}]);

/**
 * @description modal controller
 * @param $scope
 * @param $modalInstance
 * @param Items
 */
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance) {

    $scope.close = function () {
        $modalInstance.close();
    };

});
