import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import FakeElement from '../stubs/fake-element';
import elementExists from '../../src/util/element-exists';

const fakeClient = new FakeClient();
const fakeElement = new FakeElement();

chai.use(sinonChai);

describe('elementExists', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
        fakeElement.__resetStubs__();

        fakeClient.$.returns(fakeElement)
    });

    describe('When in synchronous mode', () => {
        it('Should throw element doesn\'t exist error', () => {
            fakeElement.waitForExist.throws();
            expect(() => elementExists(fakeClient, 'bla', 0)).to.throw(/Could not find element with selector/);
        });
        describe('When the element exist', () => {
            it('Should NOT throw an error', () => {
                fakeElement.waitForExist.returns();
                expect(() => elementExists(fakeClient, 'bla', 0)).to.not.throw();
            });
        });

    });
});
