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
                expect(elementExists).to.have.been.calledWith(fakeClient, '.some-selector', true);
            });
        });

        describe('When element exists', () => {
            describe('When element is visible', () => {
                beforeEach(() => {
                    elementExists.returns();
                    fakeClient.isVisible.returns(true);
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
        });
    });
});
