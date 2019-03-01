import chai, { expect } from 'chai';
import sinonChai from 'sinon-chai';
import FakeClient from '../stubs/fake-client';
import FakeElement from '../stubs/fake-element';
import immediately from '../../src/chains/immediately';
import focus from '../../src/assertions/focus';

const fakeClient = new FakeClient();
const fakeElement = new FakeElement();

//Using real chai, because it would be too much effort to stub/mock everything
chai.use((chai, utils) => focus(fakeClient, chai, utils));
chai.use((chai, utils) => immediately(fakeClient, chai, utils));
chai.use(sinonChai);

describe('focus', () => {
    beforeEach(() => {
        fakeClient.__resetStubs__();
        fakeElement.__resetStubs__();
    });

    describe('When in synchronous mode', () => {
        describe("When element doesn't exist", () => {
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
                    fakeClient.$$.returns([fakeElement])
                    fakeElement.isFocused.returns(true);
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
