function authUserCtrl(AuthService) {

    const that = this;

    this.preloader = false;
    this.emailOk = true;

    that.switchToInterface = (e) => {
        e.preventDefault();

        this.preloader = true;

        const body = {
            name: this.loginUser.name,
            email: this.loginUser.email
        };

        //https://serene-thicket-37274.herokuapp.com/login
        AuthService.authenticate(body, () => {
            this.emailOk = AuthService.status;
            this.preloader = AuthService.status;
        });
    };
}

app.component('authUser', {
    controller: authUserCtrl,
    templateUrl: './app/authUser/authUserView.html'
});
