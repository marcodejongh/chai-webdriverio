import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';

export default function text(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('text', function(expected) {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            elementExists(client, selector, config.defaultWait, false);
        }

        const elementText = client.getText(selector);

        var elementTextAsExpected;
        if (typeof(expected) == "string") {
            elementTextAsExpected = elementText === expected;
        } else {
            elementTextAsExpected = elementText.match(expected);
        }

        this.assert(
            elementTextAsExpected,
            `Expected element <${selector}> to contain text "${expected}", but it contains "${elementText}" instead.`,
            `Expected element <${selector}> not to contain text "${expected}", but it contains "${elementText}".`
        );
    });
}
