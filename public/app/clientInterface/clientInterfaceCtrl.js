function clientInterfaceCtrl($state, $transitions, AuthService, mySocket) {

    this.currentUser = AuthService.isLoggedIn().user;

    this.addCredits = () => {
        mySocket.emit('getCredits', this.currentUser);
        mySocket.on('retrieveCredits', (result) => {
            this.currentUser.credits = result;
        })
    };

    this.preloader = false;

    this.toggleMenu = function(event) {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('enter');

        event.currentTarget.classList.toggle('show-hide');

        if (event.currentTarget.classList.contains('show-hide')) {
            event.currentTarget.textContent = "Hide Menu";
        } else {
            event.currentTarget.textContent = "Show Menu";
        }

        if (event.currentTarget.classList.contains('menu-loaded') === false) {
            this.preloader = true;
            mySocket.emit('getMenu');
            mySocket.on('getMenu', (menu) => {
                this.menu = menu[0];
                this.preloader = false;
            });

            event.currentTarget.classList.add('menu-loaded');
        }
    };
}

app.component('clientInterface', {
    controller: clientInterfaceCtrl,
    templateUrl: './app/clientInterface/clientInterfaceView.html'
});