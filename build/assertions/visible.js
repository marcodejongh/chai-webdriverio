'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = visible;

var _elementExists = require('../util/element-exists');

var _elementExists2 = _interopRequireDefault(_elementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function visible(client, chai, utils) {
    chai.Assertion.addMethod('visible', function () {
        var selector = utils.flag(this, 'object');
        var negate = utils.flag(this, 'negate');

        try {
            (0, _elementExists2.default)(client, selector);
        } catch (error) {
            if (!negate) {
                throw error;
            }
        }

        var isVisible = client.isVisible(selector);

        this.assert(isVisible, 'Expected ' + selector + ' to be visible but it is not', 'Expected ' + selector + ' to not be visible but it is');
    });
}