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
        context("when element doesn't exist", () => {
            const testError = 'foobar';
            beforeEach(() => { elementExists.throws(new Error(testError)); });

            it('Should throw element doesn\'t exist error for strings', () => {
                expect(() => expect('.some-selector').to.have.text('blablabla')).to.throw(testError);
                expect(elementExists).to.have.been.calledOnce;
            });
            it('Should throw element doesn\'t exist error for regular expressions', () => {
              expect(() => expect('.some-selector').to.have.text(/blablabla/)).to.throw(testError);
            });
        });


        describe('When element exists', () => {
            let elementText = 'Never gonna give you up';
            beforeEach(() => {
              elementExists.returns();
              fakeClient.getText.returns(elementText);
            });

            describe('When call is chained with Immediately', () => {
                it('Should not wait till the element exists', () => {
                    expect('.some-selector').to.have.immediately().text(elementText);
                    expect(elementExists).to.not.have.been.called;
                });
                it('Should not throw an exception', () => {
                    expect('.some-selector').to.have.immediately().text(elementText);
                });
                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.immediately().text(elementText)).to.throw();
                    });
                });
            });

            describe('When element text matches string expectation', () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.text(elementText);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.text(elementText)).to.throw();
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

        describe('When multiple elements exists', () => {
            let elementTexts = ['Never gonna give you up', 'Never gonna let you down'];
            beforeEach(() => {
                elementExists.returns();
                fakeClient.getText.returns(elementTexts);
            });

            describe("When at least one element's text matches string expectation", () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.text(elementTexts[0]);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.text(elementTexts[0])).to.throw();
                    });
                });
            });

            describe("When at least one element's text matches regex expectation", () => {
                it('Should not throw an error', () => {
                    expect('.some-selector').to.have.text(/gon+a give/);
                });

                describe('When negated', () => {
                    it('Should throw an error', () => {
                        expect(() => expect('.some-selector').to.not.have.text(/gon+a give/)).to.throw();
                    });
                });
            });

            describe('When no element text matches string expectation', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.have.text("dis don't match jack! 1#43@")).to.throw();
                });

                describe('When negated', () => {
                    it('Should not throw an error', () => {
                        expect('.some-selector').to.not.have.text("dis don't match jack! 1#43@");
                    });
                });
            });

            describe('When no element text matches regex expectation', () => {
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
