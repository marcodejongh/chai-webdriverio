import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import proxyquire from 'proxyquire';
import sinon from 'sinon';
import immediately from '../../src/chains/immediately';

const fakeClient = new FakeClient();

const elementExists = sinon.stub();

const visible = proxyquire('../../src/assertions/visible', {
    '../util/element-exists': {
        'default': elementExists
    }
}).default;

//Using real chai, because it would be too much effort to stub/mock everything
chai.use((chai, utils) => visible(fakeClient, chai, utils));
chai.use((chai, utils) => immediately(fakeClient, chai, utils));
chai.use(sinonChai);

describe('visible', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
        elementExists.reset();
        // Reset doesn't reset throws :(
        elementExists.returns();
        fakeClient.isVisible.throws("ArgumentError");
        fakeClient.isVisible.withArgs('.some-selector').returns(false);
    });

    describe('When in synchronous mode', () => {

        it('Should throw element doesn\'t exist error', () => {
            const testError = 'foobar';
            elementExists.throws(new Error(testError));
            expect(() => expect('.some-selector').to.be.visible()).to.throw(testError);
            expect(elementExists).to.have.been.calledOnce;
        });

        describe('When negated', () => {
            it('Should call element exists with reverse=true', () => {
                expect('.some-selector').to.not.be.visible();
                expect(elementExists).to.have.been.calledWith(fakeClient, '.some-selector', 0, true);
            });
        });

        describe('When element exists', () => {
            beforeEach(() => { elementExists.returns(); });

            describe('When element is visible', () => {
                beforeEach(() => {
                    fakeClient.isVisible.withArgs('.some-selector').returns(true);
                });

                context('When given a defaultWait time', () => {
                  beforeEach(() => {
                    chai.use((chai, utils) => visible(fakeClient, chai, utils, {defaultWait: 100}));
                  });

                  it('Should call element exists with specified wait time', () => {
                      expect('.some-selector').to.be.visible();
                      expect(elementExists).to.have.been.calledWith(fakeClient, '.some-selector', 100);
                  });
                });

                describe('When call is chained with Immediately', () => {
                    it('Should not wait for the element to exist', () => {
                        expect('.some-selector').to.be.immediately().visible();
                        expect(elementExists).to.not.have.been.called;
                    });
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.be.visible();
                });

                describe('When negated', () => {
                    it('Should throw an exception', () => {
                        expect(() => expect('.some-selector').to.not.be.visible()).to.throw();
                    });
                });
            });

            describe('When element is not visible', () => {
                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.be.visible()).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an exception', () => {
                        expect('.some-selector').to.not.be.visible();
                    });
                });
            });
        });

        describe('When multiple matching elements exists', () => {
            describe('When any one is visible', () => {
                beforeEach(() => {
                    elementExists.returns();
                    fakeClient.isVisible.withArgs('.some-selector').returns([true, false]);
                });

                describe('When call is chained with Immediately', () => {
                    it('Should not wait for the element to exist', () => {
                        expect('.some-selector').to.be.immediately().visible();
                        expect(elementExists).to.not.have.been.called;
                    });
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.be.visible();
                });

                describe('When negated', () => {
                    it('Should throw an exception', () => {
                        expect(() => expect('.some-selector').to.not.be.visible()).to.throw();
                    });
                });
            });

            describe('When none are visible', () => {
                beforeEach(() => {
                    elementExists.returns();
                    fakeClient.isVisible.withArgs('.some-selector').returns([false, false]);
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.be.visible()).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an exception', () => {
                        expect('.some-selector').to.not.be.visible();
                    });
                });
            });
        });
    });
});
