const AuthInterface = function() {

    this.getUrl = function() {
        browser.get('http://localhost:3000/#!/');
    };

    this.loginForm = element(by.css('.registration-form'));
    this.loginButton = element(by.css('.form-submit'));
    this.loginName = element(by.css('.form-input-name'));
    this.loginEmail = element(by.css('.form-input-email'));

    this.hasClass = function(element, cls) {
        element.click();
        return element.getAttribute('class').then(function(classes) {
            return classes.split(' ').indexOf(cls) !== -1;
        });
    };

};

module.exports = new AuthInterface();