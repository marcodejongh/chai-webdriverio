import elementExists from '../util/element-exists';

export default function visible(client, chai, utils) {
    chai.Assertion.addMethod('visible', function() {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');

        try {
            elementExists(client, selector);
        } catch (error) {
            if(!negate) {
                throw error;
            }
        }

        const isVisible = client.isVisible(selector);

        this.assert(
            isVisible,
            `Expected ${selector} to be visible but it is not`,
            `Expected ${selector} to not be visible but it is`
        );
    });
}
