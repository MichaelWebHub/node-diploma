module.exports = {
    getService: function (serviceName) {
        return browser.executeAsyncScript(function (serviceName, callback) {
                const app = document.querySelector('html');
                const injector = angular.element(app).injector();
                const service = injector.get(serviceName);
                callback(service);
            },
            serviceName);
    }
};