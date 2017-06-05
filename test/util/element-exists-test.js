import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import elementExists from '../../src/util/element-exists';

const fakeClient = new FakeClient();

chai.use(sinonChai);

describe('elementExists', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
    });

    describe('When in synchronous mode', () => {
        it('Should throw element doesn\'t exist error', () => {
            fakeClient.waitForExist.throws();
            expect(() => elementExists(fakeClient, 'bla', 0)).to.throw(/Could not find element with selector/);
        });
        describe('When the element exist', () => {
            it('Should NOT throw an error', () => {
                fakeClient.waitForExist.returns();
                expect(() => elementExists(fakeClient, 'bla', 0)).to.not.throw();
            });
        });

    });
});
