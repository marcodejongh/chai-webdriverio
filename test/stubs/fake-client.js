import sinon from 'sinon';
import { getPrototype } from 'webdriverio/build/utils';

const clientPrototype = getPrototype('browser')

export default class FakeClient {
    constructor() {
        const fakeClient = {};
        Object.keys(clientPrototype).forEach(key => fakeClient[key] = sinon.stub());
        
        Object.assign(this, fakeClient);
    }
    __resetStubs__() {
        Object.keys(this).filter(key => key.substring(0, 1) !== '__').forEach(key => this[key].reset());
    }
};
