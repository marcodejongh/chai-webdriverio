import configWithDefaults from '../util/default-config';

export default function enabled(client, chai, utils, options) {
    const config = configWithDefaults(options);

   chai.Assertion.addMethod('enabled', function() {
        const negate = utils.flag(this, 'negate');
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

       if (!immediately) {
          client.waitForEnabled(selector, config.defaultWait, negate);
        }

       const isEnabled = client.isEnabled(selector);
        const enabledArray = (Array.isArray(isEnabled)) ? isEnabled : [isEnabled];
        const anyEnabled = enabledArray.includes(true);

       this.assert(
            anyEnabled,
            `Expected ${selector} to be enabled but it is not`,
            `Expected ${selector} to not be enabled but it is`
       );
    });
}