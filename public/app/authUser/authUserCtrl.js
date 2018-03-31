function authUserCtrl(AuthService) {

    const that = this;

    that.switchToInterface = function (e) {
        e.preventDefault();

        const body = {
            name: that.loginUser.name,
            email: that.loginUser.email
        };

        //https://serene-thicket-37274.herokuapp.com/login
        AuthService.authenticate(body);
    };
}

app.component('authUser', {
    controller: authUserCtrl,
    templateUrl: './app/authUser/authUserView.html'
});
