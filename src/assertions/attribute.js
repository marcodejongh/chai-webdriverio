import configWithDefaults from '../util/default-config';

const doesOneElementHaveAttribute = function(client, selector, attribute, expected) {
    let elements = client.$$(selector);
    let values = []
    let filteredList = elements.filter((element) => {
        let value = element.getAttribute(attribute);
        values.push(value);
        var elementHasExpectedValue = (expected instanceof RegExp) ? value.match(expected) : value === expected;

        return elementHasExpectedValue;
    });

    return {
        result: filteredList.length > 0,
        values: values
    };
}

export default function attribute(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('attribute', function(attribute, expected) {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            try {
                client.waitUntil(() => {
                    return doesOneElementHaveAttribute(client, selector, attribute, expected).result === !negate;
                }, config.defaultWait)
            } catch(e) {
                // actual assertion is handled below
            }
        }

        let elementContainsAttribute = doesOneElementHaveAttribute(client, selector, attribute, expected);
        this.assert(
          elementContainsAttribute.result,
            `Expected an element matching <${selector}> to contain attribute "${attribute}" with value "${expected}", but only found these values: ${elementContainsAttribute.values}`,
            `Expected an element matching <${selector}> not to contain attribute "${attribute} with value "${expected}", but found these attributes: ${elementContainsAttribute.values}`
        );
    });
}
