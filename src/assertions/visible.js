import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';

export default function visible(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('visible', function() {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if (!immediately) {
          elementExists(client, selector, config.defaultWait, false);
        }

        const isVisible = client.isVisible(selector);
        const visibleArray = (Array.isArray(isVisible)) ? isVisible : [isVisible];
        const anyVisible = visibleArray.includes(true);

        this.assert(
            anyVisible,
            `Expected ${selector} to be visible but it is not`,
            `Expected ${selector} to not be visible but it is`
        );
    });
}
