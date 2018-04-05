angular.module('AuthUser', ['Router', 'Online']);

angular.module('AuthUser')

    .factory('AuthService', function ($state, mySocket, uiService) {

        // In case you don't want to login after each refresh

        // let user = {
        //     message: "You are now logging in",
        //     status: true,
        //     user: {
        //         credits: 200,
        //         email: "miswow@yandex.ru",
        //         name: "michael",
        //         __v: 0,
        //         _id: "5ac38891c2703140f89a0fb1",
        //     }
        // };

        let user = {
            status: false
        };


        return {
            authenticate: function (aUser, callback) {
                mySocket.emit('logIn', aUser);

                mySocket.on('retrieveUserData', function (data) {
                    user = data;
                    callback(user);

                    if (data.status) {
                        // Animated interface switch and state change
                        uiService.hideRegistration()
                            .then(function () {
                                $state.go('client');
                            })
                    }


                })

            },

            isLoggedIn: function () {
                return user;
            },

            logOut: function () {
                user = {
                    status: false
                };
            }
        };

    });




