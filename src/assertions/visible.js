import elementExists from '../util/element-exists';

export default function visible(client, chai, utils) {
    chai.Assertion.addMethod('visible', function() {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');
        const immediately = utils.flag(this, 'immediately');

        if (!immediately) {
            elementExists(client, selector, negate);
        }

        const isVisible = client.isVisible();
        const visibleArray = (Array.isArray(isVisible)) ? isVisible : [isVisible];
        const anyVisible = visibleArray.includes(true);

        this.assert(
            anyVisible,
            `Expected ${selector} to be visible but it is not`,
            `Expected ${selector} to not be visible but it is`
        );
    });
}
