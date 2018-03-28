function clientInterfaceCtrl($http) {

    const that = this;

    this.switchToInterface = function (e) {
        e.preventDefault();

        const body = {
            name: that.loginUser.name,
            email: that.loginUser.email
        };

        fetch('https://serene-thicket-37274.herokuapp.com/#!/test');

        // fetch('https://serene-thicket-37274.herokuapp.com/#!/login', {
        //     method: 'POST',
        //     headers: {
        //         "Content-type": "application/json; charset=UTF-8"
        //     },
        //     body: JSON.stringify(body)
        // })
        //     .then(response => response.json())
        //     .then(data => {
        //         if (data.status) {
        //             that.user = {
        //                 id: data.user[0]._id,
        //                 name: data.user[0].name,
        //                 email: data.user[0].email,
        //                 credits: data.user[0].credits
        //             };
        //
        //             document.querySelector('.user-info').id = data.user[0]._id;
        //             document.querySelector('.name-output').textContent = data.user[0].name;
        //             document.querySelector('.email-output').textContent = data.user[0].email;
        //             document.querySelector('.credits-output').textContent = data.user[0].credits;
        //
        //             showAdminPanel();
        //         }
        //     })
        //     .catch(err => console.log(err));

        function showAdminPanel() {
            const whitePlane = document.querySelector('.registration-inner');
            const registration = document.querySelector('.registration');
            const form = document.querySelector('.registration-form');
            const admin = document.querySelector('.admin-panel');
            const orders = document.querySelector('.orders-panel');

            form.classList.add('ng-hide');
            whitePlane.style.transform = "scale(7)";
            whitePlane.style.background = "#ECEFF1";

            setTimeout(function () {
                registration.classList.add('ng-hide');
            }, 1300);

            setTimeout(function () {
                admin.classList.add('enter');
                orders.classList.add('enter');
            }, 1300)
        }
    };

    this.addCredits = function() {
        $http.get('https://serene-thicket-37274.herokuapp.com/#!/getcredits/' + that.user.id)
            .then(function(response) {
                document.querySelector('.credits-output').textContent = response.data.credits;
            })
    };

    this.toggleMenu = function() {
        const menu = document.querySelector('.menu');
        menu.classList.toggle('enter');
    }
}

app.component('clientInterface', {
    controller: clientInterfaceCtrl,
    templateUrl: './app/clientInterface/clientInterfaceView.html'
});