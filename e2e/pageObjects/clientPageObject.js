const ClientInterface = function() {

    this.getUrl = function() {
        browser.get('http://localhost:3000/#!/client');
    };


};

module.exports = new ClientInterface();