angular.module('Online', ['btford.socket-io']);

angular.module('Online')
    .factory('mySocket', function (socketFactory) {
        const local = "http://localhost:3000";
        const global = "https://serene-thicket-37274.herokuapp.com/";

        const myIoSocket = io.connect(global);

        mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket;
    });