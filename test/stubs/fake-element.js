import sinon from 'sinon';
import { getPrototype } from 'webdriverio/build/utils';

const elementPrototype = getPrototype('element')

export default class FakeElement {
    constructor() {
        const fakeElement = {};
        Object.keys(elementPrototype).forEach(key => fakeElement[key] = sinon.stub());

        Object.assign(this, fakeElement);
    }
    
    __resetStubs__() {
        Object.keys(this).filter(key => key.substring(0, 1) !== '__').forEach(key => this[key].reset());
    }
};
