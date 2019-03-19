import configWithDefaults from '../util/default-config';

const doesOneElementHaveValue = function(client, selector, expected) {
    let elements = client.$$(selector);
    let values = []
    let filteredList = elements.filter((element) => {
        let value = element.getValue();
        values.push(value);
        var elementHasExpectedValue = (expected instanceof RegExp) ? value.match(expected) : value === expected;

        return elementHasExpectedValue;
    });

    return {
        result: filteredList.length > 0,
        values: values
    };
}

export default function value(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('value', function(expected) {
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        if(!immediately) {
            try {
                client.waitUntil(() => {
                    return doesOneElementHaveValue(client, selector, expected).result;
                }, config.defaultWait)
            } catch(e) {
                // actual assertion is handled below
            }
        }

        let elementContainsValue = doesOneElementHaveValue(client, selector, expected);
        this.assert(
            elementContainsValue.result,
            `Expected an element matching <${selector}> to contain value "${expected}", but only found these values: ${elementContainsValue.values}`,
            `Expected an element matching <${selector}> not to contain value "${expected}", but found these values: ${elementContainsValue.values}`
        );
    });
}
