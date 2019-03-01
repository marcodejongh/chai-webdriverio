import configWithDefaults from '../util/default-config';

const isOneElementDisplayed = function(client, selector) {
    const elements = client.$$(selector);
    let filteredList = elements.filter((element) => {
         return element.isDisplayed();
    });

    return filteredList.length > 0;
}

export default function displayed(client, chai, utils, options) {
    const config = configWithDefaults(options);

    chai.Assertion.addMethod('displayed', function() {
        const negate = utils.flag(this, 'negate');
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        const errorMsg = `Expected <${selector}> to be displayed but it is not`;
        const errorMsgNegate = `Expected <${selector}> to not be displayed but it is`;

        if (!immediately) {
            client.waitUntil(() => {
                return isOneElementDisplayed(client, selector) == !negate;
            }, config.defaultWait, (negate) ? errorMsgNegate : errorMsg);
        }

        this.assert(
            isOneElementDisplayed(client, selector),
            errorMsg,
            errorMsgNegate
        );
    });
}
