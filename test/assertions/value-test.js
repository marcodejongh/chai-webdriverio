import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import immediately from '../../src/chains/immediately';

const fakeClient = new FakeClient();

const elementExists = sinon.stub();

const value = proxyquire('../../src/assertions/value', {
    '../util/element-exists': {
        'default': elementExists
    }
}).default;

//Using real chai, because it would be too much effort to stub/mock everything
chai.use((chai, utils) => value(fakeClient, chai, utils));
chai.use((chai, utils) => immediately(fakeClient, chai, utils));

chai.use(sinonChai);

describe('value', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
        elementExists.reset();
    });

    describe('When in synchronous mode', () => {
        it('Should throw element doesn\'t exist error', () => {
            const testError = 'foobar';
            elementExists.throws(new Error(testError));
            expect(() => expect('.some-selector').to.have.value('blablabla')).to.throw(testError);
            expect(elementExists).to.have.been.calledOnce;
        });

        describe('When matching element exists', () => {
            let testResult = 'Never gonna give you up';
            beforeEach(() => {
                elementExists.returns();
                fakeClient.getValue.returns(testResult);
            });

            describe('When call is chained with Immediately', () => {
                it('Should not wait till the element exists', () => {
                    expect('.some-selector').to.have.immediately().value(testResult);
                    expect(elementExists).to.not.have.been.called;
                });
                it('Should not throw an exception', () => {
                    expect('.some-selector').to.have.immediately().value(testResult);
                });
                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.immediately().value(testResult)).to.throw();
                    });
                });
            });

            describe('When element value matches string expectation', () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.value(testResult);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.value(testResult)).to.throw();
                    });
                });
            });

            describe('When element value matches regex expectation', () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.value(/gon+a give/);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.value(/gon+a give/)).to.throw();
                    });
                });
            });

            describe('When element value does not match string expectation', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.have.value("dis don't match jack! 1#43@")).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an error', () => {
                        expect('.some-selector').to.not.have.value("dis don't match jack! 1#43@");
                    });
                });
            });

            describe('When element value does not match regex expectation', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.have.value(/dis don't match jack! 1#43@/)).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an error', () => {
                        expect('.some-selector').to.not.have.value(/dis don't match jack! 1#43@/);
                    });
                });
            });
        });

        describe('When multiple elements match', () => {
            let testResult = ['Never gonna give you up', 'Never gonna let you down'];
            beforeEach(() => {
                elementExists.returns();
                fakeClient.getValue.returns(testResult);
            });

            describe('When at least one element value matches string expectation', () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.value(testResult[0]);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.value(testResult[0])).to.throw();
                    });
                });
            });

            describe('When at least one element value matches regex expectation', () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.value(/gon+a give/);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.value(/gon+a give/)).to.throw();
                    });
                });
            });

            describe('When no element value matches string expectation', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.have.value("dis don't match jack! 1#43@")).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an error', () => {
                        expect('.some-selector').to.not.have.value("dis don't match jack! 1#43@");
                    });
                });
            });

            describe('When no element value matches regex expectation', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.have.value(/dis don't match jack! 1#43@/)).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an error', () => {
                        expect('.some-selector').to.not.have.value(/dis don't match jack! 1#43@/);
                    });
                });
            });
        });
    });
});
