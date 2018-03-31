'use strict';

const app = angular.module('app', ['Router', 'AuthUser', 'Online']);

angular.module('app')
    .run(function ($state, $document, $transitions, AuthService, uiService) {

        console.log(AuthService.isLoggedIn());

        $transitions.onStart({to: '*'}, function (transition) {
            if (!AuthService.isLoggedIn()) {
                console.log("Denied! Transition to Auth");
                $state.go('auth');
            } else {
                console.log("Moving to " + transition.targetState()._identifier);
            }
        });

        $transitions.onStart({to: 'client'}, function () {
            console.log('Success');
            setTimeout(uiService.showAdminPanel, 100);
        });
    });

