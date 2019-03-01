import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import displayed from '../../src/assertions/displayed';
import immediately from '../../src/chains/immediately';
import FakeElement from '../stubs/fake-element';

//Using real chai, because it would be too much effort to stub/mock everything
chai.use(sinonChai);

describe('displayed', () => {
    let fakeClient;
    let fakeElement1;
    let fakeElement2;

    beforeEach(() => {
        fakeClient = new FakeClient();
        fakeElement1 = new FakeElement();
        fakeElement2 = new FakeElement();

        fakeElement1.isDisplayed.returns(false);
        fakeClient.$$.withArgs('.some-selector').returns([fakeElement1]);

        chai.use((chai, utils) => displayed(fakeClient, chai, utils));
        chai.use((chai, utils) => immediately(fakeClient, chai, utils));
    });

    afterEach(() => {
        fakeClient.__resetStubs__()
        fakeElement1.__resetStubs__()
    });

    describe('When in synchronous mode', () => {
        describe('When not negated', () => {
            beforeEach(() => {
                fakeElement1.isDisplayed.returns(true);

                expect('.some-selector').to.be.displayed();
            });

            it('Should call `waitUntil`', () => {
                expect(fakeClient.waitUntil).to.have.been.called;
            });

            describe('When the element is still not displayed after the wait time', () => {
                let testError;

                beforeEach(() => {
                    testError = 'Element still not displayed';

                    fakeClient.waitUntil.throws(new Error(testError));
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.be.displayed())
                        .to.throw(testError);
                });
            });
        });

        describe('When negated', () => {
            beforeEach(() => {
                expect('.some-selector').to.not.be.displayed()
            });

            it('Should call `waitUntil`', () => {
                expect(fakeClient.waitUntil).to.have.been.called;
            });

            describe('When the element is still displayed after the wait time', () => {
                let testError;

                beforeEach(() => {
                    testError = 'Element still displayed';

                    fakeClient.waitUntil.throws(new Error(testError));
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.not.be.displayed())
                        .to.throw(testError);
                });
            });
        });

        describe('When the element is displayed', () => {
            beforeEach(() => {
                fakeElement1.isDisplayed.returns(true);
            });

            it('Should not throw an exception', () => {
                expect('.some-selector').to.be.displayed();
            });

            describe('When given a default wait time' , () => {
                beforeEach(() => {
                  chai.use((chai, utils) => displayed(fakeClient, chai, utils, {defaultWait: 100}));

                  expect('.some-selector').to.be.displayed();
                });

                it('Should call `waitUntil`', () => {
                    expect(fakeClient.waitUntil)
                        .to.have.been.called;
                });
            });

            describe('When the call is chained with `immediately`', () => {
                beforeEach(() => {
                    expect('.some-selector').to.be.immediately().displayed();
                });

                it('Should not wait for the element to be displayed', () => {
                    expect(fakeClient.waitUntil).to.not.have.been.called;
                });
            });

            describe('When the assertion is negated', () => {
                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.not.be.displayed()).to.throw();
                });
            });
        });

        describe('When the element is not displayed', () => {
            beforeEach(() => {
                fakeElement1.isDisplayed.returns(false);
            });

            it('Should throw an exception', () => {
                expect(() => expect('.some-selector').to.be.displayed()).to.throw();
            });

            describe('When the assertion is negated', () => {
                it('Should not throw an exception', () => {
                    expect('.some-selector').to.not.be.displayed();
                });
            });
        });

        describe('When multiple matching elements exist', () => {
            beforeEach(() => {
                fakeClient.$$.returns([fakeElement1, fakeElement2])
            });

            describe('When any one is displayed', () => {
                beforeEach(() => {
                    fakeElement1.isDisplayed.returns(true);
                    fakeElement2.isDisplayed.returns(false);
                });

                it('Should not throw an exception', () => {
                    expect('.some-selector').to.be.displayed();
                });

                describe('When the call is chained with `immediately`', () => {
                    beforeEach(() => {
                        expect('.some-selector').to.be.immediately().displayed();
                    });

                    it('Should not wait for the element to be displayed', () => {
                        expect(fakeElement1.waitForDisplayed).to.not.have.been.called;
                    });
                });

                describe('When the assertion is negated', () => {
                    it('Should throw an exception', () => {
                        expect(() => expect('.some-selector').to.not.be.displayed()).to.throw();
                    });
                });
            });

            describe('When none are displayed', () => {
                beforeEach(() => {
                    fakeElement1.isDisplayed.returns(false);
                    fakeElement2.isDisplayed.returns(false);
                });

                it('Should throw an exception', () => {
                    expect(() => expect('.some-selector').to.be.displayed()).to.throw();
                });

                describe('When the assertion is negated', () => {
                    it('Should not throw an exception', () => {
                        expect('.some-selector').to.not.be.displayed();
                    });
                });
            });
        });
    });
});
