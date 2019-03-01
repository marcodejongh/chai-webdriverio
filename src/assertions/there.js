import elementExists from '../util/element-exists';
import configWithDefaults from '../util/default-config';

export default function there(client, chai, utils, options) {
    const config = configWithDefaults(options);
    
    chai.Assertion.addMethod('there', function() {
        const selector =  utils.flag(this, 'object');
        const negate = utils.flag(this, 'negate');
        const immediately = utils.flag(this, 'immediately');

        var isThere = !negate;
        const defaultWait = (immediately) ? 0 : config.defaultWait;
        try {
            elementExists(client, selector, defaultWait, negate);
        } catch (error) {
            isThere = negate;
        }

        this.assert(
            isThere,
            `Expected <${selector}> to be there, but it is not there.`,
            `Expected <${selector}> not to be there, and yet, there it is.`
        );
    });
}
