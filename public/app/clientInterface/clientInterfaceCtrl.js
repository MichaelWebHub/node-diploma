function clientInterfaceCtrl($http, AuthService) {

    this.currentUser = AuthService.isLoggedIn();

    this.addCredits = function() {

    };

    this.toggleMenu = function() {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('enter');
    };
}

app.component('clientInterface', {
    controller: clientInterfaceCtrl,
    templateUrl: './app/clientInterface/clientInterfaceView.html'
});