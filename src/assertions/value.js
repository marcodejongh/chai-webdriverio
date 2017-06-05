import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';

export default function value(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('value', function(expected) {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            elementExists(client, selector, config.defaultWait);
        }

        const elementValue = client.getValue(selector);

        var elementValueAsExpected;
        if (typeof(expected) == "string") {
            elementValueAsExpected = elementValue === expected;
        } else {
            elementValueAsExpected = elementValue.match(expected);
        }

        this.assert(
            elementValueAsExpected,
            `Expected element <${selector}> to contain value "${expected}", but it contains "${elementValue}" instead.`,
            `Expected element <${selector}> not to contain value "${expected}", but it contains "${elementValue}".`
        );
    });
}
