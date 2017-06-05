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
        describe("When element doesn't exist", () => {
            beforeEach(() => {
              elementExists.throws();
            });

            it('Should throw an error', () => {
                expect(() => expect('.some-selector').to.have.focus()).to.throw();
            });

            context('When negated', () => {
                it('Should throw an error', () => {
                    expect(() => expect('.some-selector').to.not.have.focus()).to.throw();
                });
            });
        });

        describe('When element exists', () => {
            describe('When element is focused', () => {
                beforeEach(() => {
                    elementExists.returns();
                    fakeClient.hasFocus.returns(true);
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
