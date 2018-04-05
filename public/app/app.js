'use strict';

const app = angular.module('app', ['Router', 'ngAnimate', 'AuthUser', 'Online']);

angular.module('app')
    .run(function ($state, $transitions, AuthService) {

        $transitions.onStart({to: 'client'}, function (transition) {
            if (!AuthService.isLoggedIn().status) {
                console.log("Denied! Transition to Auth");
                $state.go('auth');
            } else {
                console.log("Start moving to " + transition.targetState()._identifier);
            }
        });

    });

