'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (client) {
    return function chaiWebdriverIO(chai, utils) {
        (0, _visible2.default)(client, chai, utils);
        (0, _count2.default)(client, chai, utils);
        (0, _text2.default)(client, chai, utils);
    };
};

var _visible = require('./assertions/visible');

var _visible2 = _interopRequireDefault(_visible);

var _count = require('./assertions/count');

var _count2 = _interopRequireDefault(_count);

var _text = require('./assertions/text');

var _text2 = _interopRequireDefault(_text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }