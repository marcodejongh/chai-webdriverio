import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import immediately from '../../src/chains/immediately';

const fakeClient = new FakeClient();

const elementExists = sinon.stub();

const count = proxyquire('../../src/assertions/count', {
    '../util/element-exists': {
        'default': elementExists
    }
}).default;

//Using real chai, because it would be too much effort to stub/mock everything
chai.use((chai, utils) => count(fakeClient, chai, utils));
chai.use((chai, utils) => immediately(fakeClient, chai, utils));

chai.use(sinonChai);

describe('count', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
        elementExists.reset();
    });

    describe('When in synchronous mode', () => {
        it('Should throw element doesn\'t exist error', () => {
            const testError = 'foobar';
            elementExists.throws(new Error(testError));
            expect(() => expect('.some-selector').to.have.count(123)).to.throw(testError);
            expect(elementExists).to.have.been.calledOnce;
        });

        describe('When element exists', () => {
            describe('When call is chained with Immediately', () => {
                let testResult;
                beforeEach(() => {
                    testResult = [];
                    elementExists.returns();
                    fakeClient.elements.returns({value: testResult});
                    testResult.push('foo');
                    testResult.push('bar');
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.have.immediately().count(testResult.length);
                });

                it('Should not wait till the element exists', () => {
                    expect('.some-selector').to.have.immediately().count(testResult.length);
                    expect(elementExists).to.not.have.been.called;
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.immediately().count(testResult.length)).to.throw();
                    });
                });
            });

            describe('When element count matches expectation', () => {
                let testResult;
                beforeEach(() => {
                    testResult = [];
                    elementExists.returns();
                    fakeClient.elements.returns({value: testResult});
                    testResult.push('foo');
                    testResult.push('bar');
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.have.count(testResult.length);
                });
                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.count(testResult.length)).to.throw();
                    });
                });
            });
        });
    });
});
