import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import FakeElement from '../stubs/fake-element';
import enabled from '../../src/assertions/enabled';
import immediately from '../../src/chains/immediately';

//Using real chai, because it would be too much effort to stub/mock everything
chai.use(sinonChai);

describe('enabled', () => {
    let fakeClient;
    let fakeElement1;
    let fakeElement2;

    beforeEach(() => {
        fakeClient = new FakeClient();
        fakeElement1 = new FakeElement();
        fakeElement2 = new FakeElement();

        fakeElement1.isEnabled.returns(false)
        fakeClient.$$.withArgs('.some-selector').returns([fakeElement1]);

        chai.use((chai, utils) => enabled(fakeClient, chai, utils));
        chai.use((chai, utils) => immediately(fakeClient, chai, utils));
    });

    afterEach(() => {
        fakeClient.__resetStubs__()
        fakeElement1.__resetStubs__()
        fakeElement2.__resetStubs__()
    });

    describe('When in synchronous mode', () => {
        describe('When not negated', () => {
            beforeEach(() => {
                fakeElement1.isEnabled.returns(true);

                expect('.some-selector').to.be.enabled();
            });

            it('Should call `isEnabled`', () => {
                expect(fakeElement1.isEnabled).to.have.been.calledWith();
            });
        });

        describe('When negated', () => {
            beforeEach(() => {
                expect('.some-selector').to.not.be.enabled()
            });

            it('Should call `isEnabled`', () => {
                expect(fakeElement1.isEnabled).to.have.been.calledWith();
            });
        });

        describe('When the element is enabled', () => {
            beforeEach(() => {
                fakeElement1.isEnabled.returns(true);
            });

            it('Should not throw an exception', () => {
                expect('.some-selector').to.be.enabled();
            });

            describe('When given a default wait time' , () => {
                beforeEach(() => {
                  chai.use((chai, utils) => enabled(fakeClient, chai, utils, {defaultWait: 100}));

                  expect('.some-selector').to.be.enabled();
                });

                it('Should call `waitUntil`', () => {
                    expect(fakeClient.waitUntil)
                        .to.have.been.calledWith();
                });
            });

            describe('When the call is chained with `immediately`', () => {
                beforeEach(() => {
                    expect('.some-selector').to.be.immediately().enabled();
                });

                it('Should not wait for the element to be enabled', () => {
                    expect(fakeClient.waitUntil).to.not.have.been.called;
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
                fakeElement1.isEnabled.returns(false);
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
                    fakeElement1.isEnabled.returns(true);
                    fakeElement2.isEnabled.returns(false);
                    fakeClient.$$.withArgs('.multiple-selector').returns([fakeElement1, fakeElement2]);
                });

                it('Should not throw an exception', () => {
                    expect('.multiple-selector').to.be.enabled();
                });

                describe('When the call is chained with `immediately`', () => {
                    beforeEach(() => {
                        expect('.multiple-selector').to.be.immediately().enabled();
                    });

                    it('Should not wait for the element to be enabled', () => {
                        expect(fakeClient.waitUntil).to.not.have.been.called;
                    });
                });

                describe('When the assertion is negated', () => {
                    it('Should throw an exception', () => {
                        expect(() => expect('.multiple-selector').to.not.be.enabled()).to.throw();
                    });
                });
            });

            describe('When none are enabled', () => {
                beforeEach(() => {
                    fakeElement1.isEnabled.returns(false);
                    fakeElement2.isEnabled.returns(false);
                    fakeClient.$$.withArgs('.multiple-selector').returns([fakeElement1, fakeElement2]);
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.multiple-selector').to.be.enabled()).to.throw();
                });

                describe('When the assertion is negated', () => {
                    it('Should not throw an exception', () => {
                        expect('.multiple-selector').to.not.be.enabled();
                    });
                });
            });
        });
    });
});
