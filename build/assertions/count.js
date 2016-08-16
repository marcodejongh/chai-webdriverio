'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = count;

var _elementExists = require('../util/element-exists');

var _elementExists2 = _interopRequireDefault(_elementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function count(client, chai, utils) {
    chai.Assertion.addMethod('count', function (expected) {
        var selector = utils.flag(this, 'object');
        var negate = utils.flag(this, 'negate');
        var notFound = false;

        try {
            (0, _elementExists2.default)(client, selector);
        } catch (error) {
            if (negate) {
                notFound = true;
            } else {
                throw error;
            }
        }

        var elements = client.elements(selector).value;
        var elementCountIsExpected = elements.length === expected;

        this.assert(elementCountIsExpected, 'Expected ' + selector + ' to appear in the DOM ' + expected + ' times, but it shows up ' + elements.length + ' times instead.', 'Expected ' + selector + ' not to appear in the DOM ' + expected + ' times, but it does.');
    });
}