import elementExists from '../util/element-exists';

export default function count(client, chai, utils) {
    chai.Assertion.addMethod('count', function(expected) {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            elementExists(client, selector, negate);
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
