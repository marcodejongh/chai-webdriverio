import sinon from 'sinon';

//Webdriverio is not ES6 compatible
var webdriverio = require('webdriverio') ;

const client = webdriverio.remote({ desiredCapabilities: { clientName: 'chrome' } });
const fakeClient = {};
Object.keys(client.__proto__).forEach(key => fakeClient[key] = sinon.stub());

export default class FakeClient {
    constructor() {
        Object.assign(this, fakeClient);

    }
    __resetStubs__() {
        Object.keys(this).filter(key => key.substring(0, 1) !== '__').forEach(key => this[key].reset());
    }
};
