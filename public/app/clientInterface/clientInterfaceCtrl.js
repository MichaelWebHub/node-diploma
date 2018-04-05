function clientInterfaceCtrl(AuthService, mySocket) {

    this.currentUser = AuthService.isLoggedIn().user;
    this.preloaderCredits = false;
    this.orders = [];

    this.addCredits = () => {
        this.preloaderCredits = true;
        mySocket.emit('addCredits', this.currentUser);
        mySocket.on('retrieveCredits', (result) => {
            this.currentUser.credits = result;
            this.preloaderCredits = false;
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
                this.menu = menu;
                this.preloader = false;
            });

            event.currentTarget.classList.add('menu-loaded');
        }
    };

    this.addMoreCredits = (e, credits) => {
        this.preloaderCredits = true;

        mySocket.emit('addMoreCredits', {
            user: this.currentUser,
            credits: credits
        });

        mySocket.on('retrieveCredits', (result) => {
            this.currentUser.credits = result;
            this.preloaderCredits = false;
        })
    };

    const getOrders = () => {
        mySocket.emit('getOrders');
        mySocket.on('retrieveOrders', (orders) => {
            orders.forEach(order => this.orders.push(order));
        });
    };

    getOrders();

    this.buyDish = (dish) => {
        this.preloaderCredits = true;

        mySocket.emit('buyDish', {
            user: this.currentUser,
            dish: dish
        });

        mySocket.on('retrieveCredits', (result) => {
            this.currentUser.credits = result;
            this.preloaderCredits = false;
        });
    };

    mySocket.on('retrieveNewOrder', (order) => {
        this.orders.push(order);
    });

    mySocket.on('retrieveOrder', (data) => {
        this.orders.forEach((order, index) => {
            if (order._id === data._id) {
                this.orders[index] = data;
            }
        })
    });

    this.logOut = () => {
        AuthService.logOut();
    };


}

app.component('clientInterface', {
    controller: clientInterfaceCtrl,
    templateUrl: './app/clientInterface/clientInterfaceView.html'
});