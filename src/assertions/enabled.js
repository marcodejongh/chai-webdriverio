import configWithDefaults from '../util/default-config';

const isOneElementEnabled = function(client, selector) {
     const elements = client.$$(selector);
     let filteredList = elements.filter((element) => {
          return element.isEnabled();
     });
     
     return filteredList.length > 0;
}

export default function enabled(client, chai, utils, options) {
     const config = configWithDefaults(options);

     chai.Assertion.addMethod('enabled', function() {
          const negate = utils.flag(this, 'negate');
          const selector =  utils.flag(this, 'object');
          const immediately = utils.flag(this, 'immediately');

          const errorMsg = `Expected <${selector}> to be enabled but it is not`;
          const errorMsgNegate = `Expected <${selector}> to not be enabled but it is` ;

          if (!immediately) {
               client.waitUntil(() => {
                    return isOneElementEnabled(client, selector) == !negate
               }, config.defaultWait, (negate) ? errorMsgNegate : errorMsg);
          }

          this.assert(
               isOneElementEnabled(client, selector),
               errorMsg,
               errorMsgNegate
          );
     });
}