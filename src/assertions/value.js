import elementExists from '../util/element-exists';

export default function value(client, chai, utils) {
    chai.Assertion.addMethod('value', function(expected) {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            elementExists(client, selector);
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
