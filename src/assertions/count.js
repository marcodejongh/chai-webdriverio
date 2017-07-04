import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';

export default function count(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('count', function(expected) {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            elementExists(client, selector, config.defaultWait, false);
        }

        const elements = client.elements(selector).value;
        const elementCountIsExpected = elements.length === expected;

        this.assert(
            elementCountIsExpected,
            `Expected ${selector} to appear in the DOM ${expected} times, but it shows up ${elements.length} times instead.`,
            `Expected ${selector} not to appear in the DOM ${expected} times, but it does.`
        );
    });
}
