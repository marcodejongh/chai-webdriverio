import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import immediately from '../../src/chains/immediately';

const fakeClient = new FakeClient();

const elementExists = sinon.stub();

const text = proxyquire('../../src/assertions/text', {
    '../util/element-exists': {
        'default': elementExists
    }
}).default;

//Using real chai, because it would be too much effort to stub/mock everything
chai.use((chai, utils) => text(fakeClient, chai, utils));
chai.use((chai, utils) => immediately(fakeClient, chai, utils));

chai.use(sinonChai);

describe('text', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
        elementExists.reset();
    });

    describe('When in synchronous mode', () => {
        it('Should throw element doesn\'t exist error', () => {
            const testError = 'foobar';
            elementExists.throws(new Error(testError));
            expect(() => expect('.some-selector').to.have.text('blablabla')).to.throw(testError);
            expect(elementExists).to.have.been.calledOnce;
        });

        describe('When element exists', () => {
            let testResult = 'Never gonna give you up';
            beforeEach(() => {
                elementExists.returns();
                fakeClient.getText.returns(testResult);
            });

            describe('When call is chained with Immediately', () => {
                it('Should not wait till the element exists', () => {
                    expect('.some-selector').to.have.immediately().text(testResult);
                    expect(elementExists).to.not.have.been.called;
                });
                it('Should not throw an exception', () => {
                    expect('.some-selector').to.have.immediately().text(testResult);
                });
                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.immediately().text(testResult)).to.throw();
                    });
                });
            });

            describe('When element text matches string expectation', () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.text(testResult);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.text(testResult)).to.throw();
                    });
                });
            });

            describe('When element text matches regex expectation', () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.text(/gon+a give/);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.text(/gon+a give/)).to.throw();
                    });
                });
            });

            describe('When element text does not match string expectation', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.have.text("dis don't match jack! 1#43@")).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an error', () => {
                        expect('.some-selector').to.not.have.text("dis don't match jack! 1#43@");
                    });
                });
            });

            describe('When element text does not match regex expectation', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.have.text(/dis don't match jack! 1#43@/)).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an error', () => {
                        expect('.some-selector').to.not.have.text(/dis don't match jack! 1#43@/);
                    });
                });
            });
        });
    });
});
