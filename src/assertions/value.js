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
        const valueArray = (elementValue instanceof Array) ? elementValue : [elementValue];

        var elementValueAsExpected;
        if (typeof(expected) == "string") {
            elementValueAsExpected = valueArray.some(value => value === expected);
        } else {
            elementValueAsExpected = valueArray.some(value => value.match(expected));
        }

        this.assert(
            elementValueAsExpected,
            `Expected an element matching <${selector}> to contain value "${expected}", but only found these values: ${valueArray}`,
            `Expected an element matching <${selector}> not to contain value "${expected}", but found these values: ${valueArray}`
        );
    });
}
