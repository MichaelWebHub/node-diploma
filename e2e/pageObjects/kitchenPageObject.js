const KitchenInterface = function() {

    this.getUrl = function() {
        browser.get('http://localhost:3000/#!/kitchen');
    };


};

module.exports = new KitchenInterface();