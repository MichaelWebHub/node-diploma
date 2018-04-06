function authUserCtrl(AuthService) {

    const that = this;

    this.preloader = false;
    this.status = true;

    that.switchToInterface = (e) => {
        e.preventDefault();

        this.preloader = true;

        const body = {
            name: this.loginUser.name.toLowerCase(),
            email: this.loginUser.email.toLowerCase()
        };

        //https://serene-thicket-37274.herokuapp.com/login
        AuthService.authenticate(body, (user) => {
            this.status = user.status;
            this.message = user.message;
            this.preloader = user.status;
        });
    };
}

app.component('authUser', {
    controller: authUserCtrl,
    templateUrl: './app/authUser/authUserView.html'
});
