module.exports.config = {

    seleniumAddress: 'http://localhost:4444/wd/hub',
    allScriptsTimeout: 11000,

    specs: [
        'tests/*Test.js'
    ],

    capabilities: {
        'browserName': 'chrome'
    },

    baseUrl: 'http://localhost:3000/',

    framework: 'mocha',

    mochaOpts: {
        reporter: "spec",
        slow: 10000,
        timeout: 10000
    },

    onPrepare: function() {
        const chai = require('chai');
        const chaiAsPromised = require('chai-as-promised');

        chai.use(chaiAsPromised);
    }

};
