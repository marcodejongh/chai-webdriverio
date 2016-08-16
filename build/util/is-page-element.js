'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

exports.default = isPageElement;
var PageElementProperties = ['type', 'message', 'state', 'sessionId', 'value', 'selector'];

function isPageElement(PageElement) {
  /*
   A instanceOf check would be more appropiate, but the PageElement is actually not a
   instance of anything but just a object. SO using the signature will have to do.
   */
  return (typeof PageElement === 'undefined' ? 'undefined' : _typeof(PageElement)) === 'object' && PageElementProperties.every(function (key) {
    return typeof PageElement[key] === 'string';
  });
}