function kitchenInterfaceCtrl(AuthService, mySocket) {

    this.orders = [];
    this.cookingOrders = [];

    const getOrders = () => {
        mySocket.emit('getOrders', {});
        mySocket.on('retrieveOrders', (orders) => {
            orders.forEach(order => {
                if (order.statusId === 1) {
                    this.orders.push(order);
                }
                if (order.statusId === 2) {
                    this.cookingOrders.push(order);
                }
            });
        });

    };

    getOrders();

    this.startCooking = (order) => {
        this.orders.forEach((pendingOrder, index) => {
            if (index === this.orders.indexOf(order)) {
                mySocket.emit('startCooking', this.orders[index]);

                this.orders.splice(index, 1);
                this.cookingOrders.push(pendingOrder);
            }
        })
    };

    this.ready = (order) => {
        this.cookingOrders.forEach((cookingOrder, index) => {
            if (index === this.cookingOrders.indexOf(order)) {
                mySocket.emit('startDelivery', this.cookingOrders[index]);

                this.cookingOrders.splice(index, 1);
            }
        })
    };

    mySocket.on('retrieveNewOrder', (order) => {
        this.orders.push(order);
    });

    mySocket.on('retrieveOrder', (data) => {
        this.orders.forEach((order, index) => {
            if (order._id === data._id) {
                this.orders[index] = data;
            }
        });

        this.cookingOrders.forEach((order, index) => {
            if (order._id === data._id) {
                this.cookingOrders[index] = data;
            }
        })
    });
}

app.component('kitchenInterface', {
    controller: kitchenInterfaceCtrl,
    templateUrl: './app/kitchenInterface/kitchenView.html'
});