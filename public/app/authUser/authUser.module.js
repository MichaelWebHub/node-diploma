angular.module('AuthUser', ['Router', 'Online']);

angular.module('AuthUser')

    .factory('AuthService', function ($state, mySocket, uiService) {

        let user = {
            status: false
        };


        return {
            authenticate: function (aUser, callback) {
                mySocket.emit('logIn', aUser);

                mySocket.on('retrieveUserData', function (data) {
                    user = data;
                    callback();

                    if (data.status) {
                        // Animated interface switch and state change
                        uiService.hideRegistration()
                            .then(function () {
                                console.log("hideRegistration() resolved");
                                $state.go('client');
                            })
                    }


                })

            },

            isLoggedIn:

                function () {
                    return user;
                }
        };

    });




