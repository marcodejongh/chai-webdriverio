import configWithDefaults from '../util/default-config';

const isOneElementFocused = function(client, selector) {
    const elements = client.$$(selector);
    let filteredList = elements.filter((element) => {
         return element.isFocused();
    });
    return filteredList.length > 0;
}

export default function focus(client, chai, utils, options) {
    const config = configWithDefaults(options);

    chai.Assertion.addMethod('focus', function() {
        const negate = utils.flag(this, 'negate');
        const selector =  utils.flag(this, 'object');
        const immediately = utils.flag(this, 'immediately');

        const errorMsg = `Expected <${selector}> to be focused but it is not`;
        const errorMsgNegate = `Expected <${selector}> to not be focused but it is`;

        if (!immediately) {
             client.waitUntil(() => {
                  return isOneElementFocused(client, selector) == !negate;
             }, config.defaultWait, (negate) ? errorMsgNegate : errorMsg);
        }

        this.assert(
            isOneElementFocused(client, selector),
            errorMsg,
            errorMsgNegate
        );
    });
}
