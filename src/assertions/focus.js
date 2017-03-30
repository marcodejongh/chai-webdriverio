import elementExists from '../util/element-exists';

export default function focus(client, chai, utils) {
    chai.Assertion.addMethod('focus', function() {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');
        const immediately = utils.flag(this, 'immediately');

        if (!immediately) {
            elementExists(client, selector, negate);
        }

        const hasFocus = client.hasFocus(selector);

        this.assert(
            hasFocus,
            `Expected ${selector} to be focused but it is not`,
            `Expected ${selector} to not be focused but it is`
        );
    });
}
