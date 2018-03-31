angular.module('AuthUser', ['Router', 'Online']);

angular.module('AuthUser')

    .factory('AuthService', function ($state, mySocket, uiService) {

        let user;

        return {
            authenticate: function (aUser, switchInterface) {
                mySocket.emit('logIn', aUser);

                mySocket.on('retrieveUserData', function (data) {
                    if (data.status) {
                        user = data.user;

                        // Animated interface switch and state change
                        uiService.hideRegistration()
                            .then(function () {
                                console.log("hideRegistration() resolved");
                                $state.go('client');
                            })

                    }
                })
            },

            isLoggedIn: function () {
                return user ? user : false;
            }
        };

    });




