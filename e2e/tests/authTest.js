const expect = require('chai').expect;
const AuthInterface = require('../pageObjects/authPageObject');
const helper = require('../pageObjects/helper');


describe('Test auth interface', function () {

    beforeEach(function () {
        AuthInterface.getUrl();
    });

    it('Test auth: valid inputs', function() {
        AuthInterface.loginName.sendKeys('Michael');
        AuthInterface.loginEmail.sendKeys('miswow@yandex.ru');
        expect(AuthInterface.hasClass(AuthInterface.loginForm, "ng-valid")).eventually.to.be.true;
    });

    it('Test auth: invalid inputs', function() {
        AuthInterface.loginName.sendKeys('Michael');
        AuthInterface.loginEmail.sendKeys('miswowyandex.ru');
        expect(AuthInterface.hasClass(AuthInterface.loginForm, "ng-invalid")).eventually.to.be.true;

        AuthInterface.loginName.sendKeys('Michael');
        AuthInterface.loginEmail.sendKeys('miswow@yandexru');
        expect(AuthInterface.hasClass(AuthInterface.loginForm, "ng-invalid")).eventually.to.be.true;
    });

    it('Test state change', function () {
        AuthInterface.loginName.sendKeys('Michael');
        AuthInterface.loginEmail.sendKeys('miswow@yandex.ru');
        AuthInterface.loginButton.click()
            .then(() => {
                helper.getService('AuthService')
                    .then(service => {
                        console.log(service.isLoggedIn().user);
                    });
            })


    });
});

