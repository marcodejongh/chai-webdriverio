import configWithDefaults from '../util/default-config';

function hasCount(client, selector, count, countStore) {
    const elements = client.$$(selector);

    countStore.count = elements.length;

    return elements.length === count;
}

function waitUntilCount(client, selector, count, defaultWait=0, reverse) {
    const countStore = {};

    if (!reverse) {
        try {
            client.waitUntil(
                () => hasCount(client, selector, count, countStore),
                defaultWait
            );
        } catch (error) {
            throw new Error(
                `Element with selector <${selector}> does not appear in the DOM ${count} times ` +
                    `within ${defaultWait} ms, but it shows up ${countStore.count} times instead.`
            );
        }
    } else {
        client.waitUntil(
            () => !hasCount(client, selector, count, countStore),
            defaultWait,
            `Element with selector <${selector}> still appears in the DOM ${count} times after ${defaultWait} ms`
        );
    }
}

export default function count(client, chai, utils, options) {
    const config = configWithDefaults(options);
    chai.Assertion.addMethod('count', function(expected) {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');
        const immediately = utils.flag(this, 'immediately');

        if (!immediately) {
            waitUntilCount(client, selector, expected, config.defaultWait, negate);
        }

        const countStore = {};

        this.assert(
            hasCount(client, selector, expected, countStore),
            `Expected <${selector}> to appear in the DOM ${expected} times, but it shows up ${countStore.count} times instead.`,
            `Expected <${selector}> not to appear in the DOM ${expected} times, but it does.`
        );
    });
}
