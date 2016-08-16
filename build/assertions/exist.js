'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = exist;
exports.default = count;

var _isPageElement = require('../util/is-page-element');

var _isPageElement2 = _interopRequireDefault(_isPageElement);

var _elementExists = require('../util/element-exists');

var _elementExists2 = _interopRequireDefault(_elementExists);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exist(browser, chai, utils) {
    utils.overwriteProperty(chai.Assertion.prototype, 'exist', function (_super) {
        return function () {

            new chai.Assertion('PageElementExists').assert(obj.isExisting() === true, 'expected element with selector ' + obj.selector + ' to be on the page', 'expected element with selector ' + obj.selector + ' to not be on the page');
        };
    });
}

function count(browser, chai, utils) {
    chai.Assertion.overwriteProperty('count', function () {
        var selector = utils.flag(this, 'object');
        var negate = utils.flag(this, 'negate');

        (0, _elementExists2.default)(browser, selector);

        var elements = browser.elements(selector).value;
        var elementCountIsExpected = elements.length === expected;

        new chai.Assertion('ElementCount').assert(negate && !elementCountIsExpected || !negate && elementCountIsExpected, 'expected element with selector ' + selector + ' to be on the page', 'expected element with selector ' + selector + ' to not be on the page');
    });
}