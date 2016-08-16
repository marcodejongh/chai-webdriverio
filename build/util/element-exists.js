"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = assertElementExists;
function assertElementExists(client, selector) {
    try {
        client.waitForExist(selector);
    } catch (error) {
        throw new Error("Could not find element with selector " + selector);
    }
}