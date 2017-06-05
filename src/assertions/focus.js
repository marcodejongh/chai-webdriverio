import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';

export default function focus(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('focus', function() {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if (!immediately) {
          elementExists(client, selector, config.defaultWait);
        }

        const hasFocus = client.hasFocus(selector);

        this.assert(
            hasFocus,
            `Expected ${selector} to be focused but it is not`,
            `Expected ${selector} to not be focused but it is`
        );
    });
}
