import elementExists from '../util/element-exists';

export default function there(config, chai, utils) {
  var client = config.client
    chai.Assertion.addMethod('there', function() {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');

        var isThere = true
        try {
            elementExists(client, selector);
        } catch (error) {
            isThere = false
        }

        this.assert(
            isThere,
            `Expected ${selector} to be there, but it is not there.`,
            `Expected ${selector} not to be there, and yet, there it is.`
        );
    });
}
