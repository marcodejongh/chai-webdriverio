import elementExists from '../util/element-exists';

export default function text(client, chai, utils) {
    chai.Assertion.addMethod('text', function(expected) {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            elementExists(client, selector);
        }

        const elementText = client.getText(selector);
        const textArray = (elementText instanceof Array) ? elementText : [elementText];

        var elementTextAsExpected;
        if (expected instanceof RegExp) {
            elementTextAsExpected = textArray.some(text => text.match(expected));
        } else {
            elementTextAsExpected = textArray.some(text => text === expected);
        }

        this.assert(
            elementTextAsExpected,
            `Expected element <${selector}> to contain text "${expected}", but it contains "${elementText}" instead.`,
            `Expected element <${selector}> not to contain text "${expected}", but it contains "${elementText}".`
        );
    });
}
