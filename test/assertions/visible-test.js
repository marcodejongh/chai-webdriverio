import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import sinon from 'sinon';
import visible from '../../src/assertions/visible';
import immediately from '../../src/chains/immediately';

//Using real chai, because it would be too much effort to stub/mock everything
chai.use(sinonChai);

describe('visible', () => {
    let fakeClient;

    beforeEach(() => {
        fakeClient = new FakeClient();

        fakeClient.isVisible.throws('ArgumentError');
        fakeClient.isVisible.withArgs('.some-selector').returns(false);

        chai.use((chai, utils) => visible(fakeClient, chai, utils));
        chai.use((chai, utils) => immediately(fakeClient, chai, utils));
    });

    afterEach(() => fakeClient.__resetStubs__());

    describe('When in synchronous mode', () => {
        describe('When not negated', () => {
            beforeEach(() => {
                fakeClient.isVisible.withArgs('.some-selector').returns(true);

                expect('.some-selector').to.be.visible();
            });

            it('Should call `waitForVisible` without `reverse`', () => {
                expect(fakeClient.waitForVisible)
                    .to.have.been.calledWith('.some-selector', 0, undefined);
            });

            describe('When the element is still not visible after the wait time', () => {
                let testError;

                beforeEach(() => {
                    testError = 'Element still not visible';

                    fakeClient.waitForVisible.throws(new Error(testError));
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.be.visible())
                        .to.throw(testError);
                });
            });
        });

        describe('When negated', () => {
            beforeEach(() => expect('.some-selector').to.not.be.visible());

            it('Should call `waitForVisible` with `reverse` true', () => {
                expect(fakeClient.waitForVisible)
                    .to.have.been.calledWith('.some-selector', 0, true);
            });

            describe('When the element is still visible after the wait time', () => {
                let testError;

                beforeEach(() => {
                    testError = 'Element still visible';

                    fakeClient.waitForVisible.throws(new Error(testError));
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.not.be.visible())
                        .to.throw(testError);
                });
            });
        });

        describe('When the element is visible', () => {
            beforeEach(() => {
                fakeClient.isVisible.withArgs('.some-selector').returns(true);
            });

            it('Should not throw an exception', () => {
                expect('.some-selector').to.be.visible();
            });

            describe('When given a default wait time' , () => {
                beforeEach(() => {
                  chai.use((chai, utils) => visible(fakeClient, chai, utils, {defaultWait: 100}));

                  expect('.some-selector').to.be.visible();
                });

                it('Should call `waitForVisible` with the specified wait time', () => {
                    expect(fakeClient.waitForVisible)
                        .to.have.been.calledWith('.some-selector', 100);
                });
            });

            describe('When the call is chained with `immediately`', () => {
                beforeEach(() => {
                    expect('.some-selector').to.be.immediately().visible();
                });

                it('Should not wait for the element to be visible', () => {
                    expect(fakeClient.waitForVisible).to.not.have.been.called;
                });
            });

            describe('When the assertion is negated', () => {
                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.not.be.visible()).to.throw();
                });
            });
        });

        describe('When the element is not visible', () => {
            beforeEach(() => {
                fakeClient.isVisible.withArgs('.some-selector').returns(false);
            });

            it('Should throw an exception', () => {
                expect(() => expect('.some-selector').to.be.visible()).to.throw();
            });

            describe('When the assertion is negated', () => {
                it('Should not throw an exception', () => {
                    expect('.some-selector').to.not.be.visible();
                });
            });
        });

        describe('When multiple matching elements exist', () => {
            describe('When any one is visible', () => {
                beforeEach(() => {
                    fakeClient.isVisible.withArgs('.some-selector').returns([true, false]);
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.be.visible();
                });

                describe('When the call is chained with `immediately`', () => {
                    beforeEach(() => {
                        expect('.some-selector').to.be.immediately().visible();
                    });

                    it('Should not wait for the element to be visible', () => {
                        expect(fakeClient.waitForVisible).to.not.have.been.called;
                    });
                });

                describe('When the assertion is negated', () => {
                    it('Should throw an exception', () => {
                        expect(() => expect('.some-selector').to.not.be.visible()).to.throw();
                    });
                });
            });

            describe('When none are visible', () => {
                beforeEach(() => {
                    fakeClient.isVisible.withArgs('.some-selector').returns([false, false]);
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.be.visible()).to.throw();
                });

                describe('When the assertion is negated', () => {
                    it('Should not throw an exception', () => {
                        expect('.some-selector').to.not.be.visible();
                    });
                });
            });
        });
    });
});
