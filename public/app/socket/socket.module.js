angular.module('Online', ['btford.socket-io']);

angular.module('Online')
    .factory('mySocket', function (socketFactory) {
        const myIoSocket = io.connect('https://serene-thicket-37274.herokuapp.com/');

        mySocket = socketFactory({
            ioSocket: myIoSocket
        });

        return mySocket;
    });