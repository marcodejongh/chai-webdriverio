import elementExists from '../util/element-exists';

export default function text(client, chai, utils) {
    chai.Assertion.addMethod('text', function(expected) {
        const selector =  utils.flag(this, 'object');

        elementExists(client, selector);

        const elementText = client.getText(selector);
        const elementTextAsExpected = elementText === expected;

        this.assert(
            elementTextAsExpected,
            `Expected element <${selector}> to contain text "${expected}", but it contains "${elementText}" instead.`,
            `Expected element <${selector}> not to contain text "${expected}", but it contains "${elementText}".`
        );
    });
}
