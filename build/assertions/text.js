'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = text;

var _elementExists = require('../util/element-exists');

var _elementExists2 = _interopRequireDefault(_elementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function text(client, chai, utils) {
    chai.Assertion.addMethod('text', function (expected) {
        var selector = utils.flag(this, 'object');
        var negate = utils.flag(this, 'negate');

        (0, _elementExists2.default)(client, selector);

        var elementText = client.getText(selector);
        var elementTextAsExpected = elementText === expected;

        this.assert(elementTextAsExpected, 'Expected element <' + selector + '> to contain text "' + expected + '", but it contains "' + elementText + '" instead.', 'Expected element <' + selector + '> not to contain text "' + expected + '", but it contains "' + elementText + '".');
    });
}