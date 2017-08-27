import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import sinon from 'sinon';
import enabled from '../../src/assertions/enabled';
import immediately from '../../src/chains/immediately';

//Using real chai, because it would be too much effort to stub/mock everything
chai.use(sinonChai);

describe('enabled', () => {
    let fakeClient;

    beforeEach(() => {
        fakeClient = new FakeClient();

        fakeClient.isEnabled.throws('ArgumentError');
        fakeClient.isEnabled.withArgs('.some-selector').returns(false);

        chai.use((chai, utils) => enabled(fakeClient, chai, utils));
        chai.use((chai, utils) => immediately(fakeClient, chai, utils));
    });

    afterEach(() => fakeClient.__resetStubs__());

    describe('When in synchronous mode', () => {
        describe('When not negated', () => {
            beforeEach(() => {
                fakeClient.isEnabled.withArgs('.some-selector').returns(true);

                expect('.some-selector').to.be.enabled();
            });

            it('Should call `waitForEnabled` without `reverse`', () => {
                expect(fakeClient.waitForEnabled).to.have.been.calledWith('.some-selector', 0);
            });
        });

        describe('When negated', () => {
            beforeEach(() => expect('.some-selector').to.not.be.enabled());

            it('Should call `waitForEnabled` with `reverse` true', () => {
                expect(fakeClient.waitForEnabled).to.have.been.calledWith('.some-selector', 0, true);
            });
        });

        describe('When the element is enabled', () => {
            beforeEach(() => {
                fakeClient.isEnabled.withArgs('.some-selector').returns(true);
            });

            it('Should not throw an exception', () => {
                expect('.some-selector').to.be.enabled();
            });

            describe('When given a default wait time' , () => {
                beforeEach(() => {
                  chai.use((chai, utils) => enabled(fakeClient, chai, utils, {defaultWait: 100}));

                  expect('.some-selector').to.be.enabled();
                });

                it('Should call `waitForEnabled` with the specified wait time', () => {
                    expect(fakeClient.waitForEnabled)
                        .to.have.been.calledWith('.some-selector', 100);
                });
            });

            describe('When the call is chained with `immediately`', () => {
                beforeEach(() => {
                    expect('.some-selector').to.be.immediately().enabled();
                });

                it('Should not wait for the element to be enabled', () => {
                    expect(fakeClient.waitForEnabled).to.not.have.been.called;
                });
            });

            describe('When the assertion is negated', () => {
                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.not.be.enabled()).to.throw();
                });
            });
        });

        describe('When the element is not enabled', () => {
            beforeEach(() => {
                fakeClient.isEnabled.withArgs('.some-selector').returns(false);
            });

            it('Should throw an exception', () => {
                expect(() => expect('.some-selector').to.be.enabled()).to.throw();
            });

            describe('When the assertion is negated', () => {
                it('Should not throw an exception', () => {
                    expect('.some-selector').to.not.be.enabled();
                });
            });
        });

        describe('When multiple matching elements exist', () => {
            describe('When any one is enabled', () => {
                beforeEach(() => {
                    fakeClient.isEnabled.withArgs('.some-selector').returns([true, false]);
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.be.enabled();
                });

                describe('When the call is chained with `immediately`', () => {
                    beforeEach(() => {
                        expect('.some-selector').to.be.immediately().enabled();
                    });

                    it('Should not wait for the element to be enabled', () => {
                        expect(fakeClient.waitForEnabled).to.not.have.been.called;
                    });
                });

                describe('When the assertion is negated', () => {
                    it('Should throw an exception', () => {
                        expect(() => expect('.some-selector').to.not.be.enabled()).to.throw();
                    });
                });
            });

            describe('When none are enabled', () => {
                beforeEach(() => {
                    fakeClient.isEnabled.withArgs('.some-selector').returns([false, false]);
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.be.enabled()).to.throw();
                });

                describe('When the assertion is negated', () => {
                    it('Should not throw an exception', () => {
                        expect('.some-selector').to.not.be.enabled();
                    });
                });
            });
        });
    });
});
