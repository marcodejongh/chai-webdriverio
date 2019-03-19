import configWithDefaults from '../util/default-config';

const doesOneElementContainText = function(client, selector, expected) {
    let elements = client.$$(selector);
    let texts = []
    let filteredList = elements.filter((element) => {
        let text = element.getText();
        texts.push(text);
        var elementHasExpectedText = (expected instanceof RegExp) ? text.match(expected) : text === expected;

        return elementHasExpectedText;
    });

    return {
        result: filteredList.length > 0,
        texts: texts
    };
}

export default function text(client, chai, utils, options) {
    const config = configWithDefaults(options);

    chai.Assertion.addMethod('text', function(expected) {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            try {
                client.waitUntil(() => {
                    return doesOneElementContainText(client, selector, expected).result;
                }, config.defaultWait)
            } catch(e) { 
                // actual assertion is handled below
            }
        }

        let elementContainsText = doesOneElementContainText(client, selector, expected);
        this.assert(
            elementContainsText.result,
            `Expected element <${selector}> to contain text "${expected}", but only found: ${elementContainsText.texts}`,
            `Expected element <${selector}> not to contain text "${expected}", but found: ${elementContainsText.texts}`
        );
    });
}
