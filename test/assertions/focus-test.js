import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import immediately from '../../src/chains/immediately';

const fakeClient = new FakeClient();

const elementExists = sinon.stub();

const focus = proxyquire('../../src/assertions/focus', {
    '../util/element-exists': {
        'default': elementExists
    }
}).default;

//Using real chai, because it would be too much effort to stub/mock everything
chai.use((chai, utils) => focus(fakeClient, chai, utils));
chai.use((chai, utils) => immediately(fakeClient, chai, utils));
chai.use(sinonChai);

describe('focus', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
        elementExists.reset();
        // Reset doesn't reset throws :(
        elementExists.returns();
    });

    describe('When in synchronous mode', () => {
        it('Should throw element doesn\'t exist error', () => {
            const testError = 'foobar';
            elementExists.throws(new Error(testError));
            expect(() => expect('.some-selector').to.have.focus()).to.throw(testError);
            expect(elementExists).to.have.been.calledOnce;
        });

        describe('When negated', () => {
            it('Should call element exists with reverse=true', () => {
                expect('.some-selector').to.not.have.focus();
                expect(elementExists).to.have.been.calledWith(fakeClient, '.some-selector', true);
            });
        });

        describe('When element exists', () => {
            describe('When element is focused', () => {
                beforeEach(() => {
                    elementExists.returns();
                    fakeClient.hasFocus.returns(true);
                });

                describe('When call is chained with Immediately', () => {
                    it('Should not wait for the element to exist', () => {
                        expect('.some-selector').to.have.immediately().focus();
                        expect(elementExists).to.not.have.been.called;
                    });
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.have.focus();
                });

                describe('When negated', () => {
                    it('Should throw an exception', () => {
                        expect(() => expect('.some-selector').to.not.have.focus()).to.throw();
                    });
                });
            });
        });
    });
});
