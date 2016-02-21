var app = angular.module('angularTable', ['angularUtils.directives.dirPagination']);

app.controller('listdata', function ($scope, $http) {
    $scope.users = []; //declare an empty array
    $scope.cols = [];
    $http.get("mockJson/mock.json").success(function (response) {
        $scope.users = response;//ajax request to fetch data into $scope.data
        $scope.cols = Object.keys($scope.users[0]);
    });
});
app.directive("smartTable", function () {
    return {
        restrict: 'E',
        templateUrl: 'views/partials/table.html',
        scope: {
            data: '=',
            cols: '='
        },
        controller: function ($scope) {
            $scope.getData = function () {
                return $scope.data;
            };
            $scope.getColumns = function () {
                return $scope.cols;
            };
        },
        link: function postLink(scope, element, attrs) {
            element.find(".table").css("margin-bottom","0px");
            scope.entriesOptions = [10,25,50,100];
            scope.sort = function (keyname) {
                scope.sortKey = keyname;   //set the sortKey to the param passed
                scope.reverse = !scope.reverse; //if true make it false and vice versa
            }
            scope.numEntries = 10;

        }
    }
});