'use strict';

// Declare app level module which depends on views, and components
const app = angular.module('app', ['ngRoute']);

angular.module('app')

    .config(['$routeProvider',
        function config($routeProvider) {

            $routeProvider.when('/', {
                template: '<client-interface></client-interface>'
            })
        }
    ]);

// angular.module('app')
//     .config(['$httpProvider', function($httpProvider) {
//         $httpProvider.defaults.headers.common = {
//             "application-id": "Test",
//             "secret-key": "Testest0111" }
//     }]);
