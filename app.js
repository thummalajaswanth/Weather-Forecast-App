// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);


// ROUTES
weatherApp.config(function ($routeProvider) {
    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
        .when('/forecast', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        })
        .when('/forecast/:days', {
            templateUrl: 'pages/forecast.html',
            controller: 'forecastController'
        });
});

//SERVICES
weatherApp.service('cityService', function () {
    this.city = "Eluru";
});

// CONTROLLER

weatherApp.controller('homeController', ['$scope', 'cityService', function ($scope, cityService) {
    $scope.city = cityService.city;

    $scope.$watch('city', function () {
        cityService.city = $scope.city;
    });
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function ($scope, $resource, $routeParams, cityService) {
    $scope.city = cityService.city;
    $scope.days = $routeParams.days || 2;
    $scope.weatherAPI = $resource("http://api.weatherapi.com/v1/forecast.json?key=a19e5510d499452094b24114200310", { callback: "JSON_CALLBACK" }, + '&' + { get: { method: "JSONP" } });
    // console.log($scope.weatherAPI);

    $scope.weatherResult = $scope.weatherAPI.get({ q: $scope.city, days: $scope.days });
    console.log($scope.weatherResult);
}]);

// DIRECTIVES

weatherApp.directive("weatherForecast", function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherForecast.html',
        replace: true,
    };
});
weatherApp.directive("weatherReport", function () {
    return {
        restrict: 'E',
        templateUrl: 'directives/weatherReport.html',
        replace: true,
    };
});