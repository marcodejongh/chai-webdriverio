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

        const getText = client.getText(selector);
        const textArray = (getText instanceof Array) ? getText : [getText];

        var elementTextAsExpected;
        if (expected instanceof RegExp) {
            elementTextAsExpected = textArray.some(text => text.match(expected));
        } else {
            elementTextAsExpected = textArray.some(text => text === expected);
        }

        this.assert(
            elementTextAsExpected,
            `Expected element <${selector}> to contain text "${expected}", but only found: ${textArray}`,
            `Expected element <${selector}> not to contain text "${expected}", but found: ${textArray}`
        );
    });
}
