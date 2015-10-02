/**
 * Created by manueljlopez on 1/10/15.
 */
var app = angular.module("questionsApp", ['ngRoute','ngResource','ngAnimate','ui.bootstrap']);

app.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/views/all_questions.html',
                controller: 'AppCtrl'
            }).
            when('/question/:questionId', {
                templateUrl: 'app/views/single_question.html',
                controller: 'AppCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });

    }]);

/**
 * @description filter dates
 */
app.filter('fromNow', function() {
        return function(dateString) {
            return moment(new Date(dateString)).startOf('day').fromNow()
        };
});

/**
 * @description app controller
 */
app.controller('AppCtrl', ['$scope','$rootScope','$modal','$log','$http','$routeParams',function($scope,$rootScope,$modal,$log,$http,$routeParams)
{


    $scope.loadData = function() {
        $http.get('app/data.json').
            success(function (data) {
                $rootScope.datos = data;
            });
    };


    $scope.getQuestion = function(){
        $scope.thequestion = null;
        for(var i=0;i<$rootScope.datos.length;i++){

            if($rootScope.datos[i].question.id==$routeParams.questionId){
                $scope.thequestion = $rootScope.datos[i];
                return;
            }

        };
    };

    if($routeParams.questionId){
        $scope.getQuestion();
    }else{
        if($rootScope.datos == null){
            $scope.loadData();
        };
    }

    $scope.animationsEnabled = true;

    $scope.searchValue = "";

    $scope.search = function(value){
        $scope.searchValue = value;
    };

    $scope.open = function (id) {

        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            size: 'lg',
            templateUrl: 'app/views/modal.html',
            controller: 'ModalInstanceCtrl',
            resolve: {
                modaldata: function () {

                    for(var i=0;i<$rootScope.datos.length;i++){

                        if($rootScope.datos[i].id==id){
                            return $rootScope.datos[i];
                        }

                    };
                }
            }
        });
    };

    $scope.limit = 2;

}]);

/**
 * @description modal controller
 */
app.controller('ModalInstanceCtrl', function ($scope, $modalInstance,modaldata) {

    $scope.modalData = modaldata;

    $scope.close = function () {
        $modalInstance.close();
    };


});
