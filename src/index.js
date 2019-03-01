'use strict';
import there from './assertions/there';
import displayed from './assertions/displayed';
import count from './assertions/count';
import text from './assertions/text';
import value from './assertions/value';
import focus from './assertions/focus';
import enabled from './assertions/enabled';
import immediately from './chains/immediately';

export default function (client, options = {}) {
    return function chaiWebdriverIO(chai, utils) {
        let methodsToAdd = [there, displayed, count, text, immediately, value, focus , enabled];

        methodsToAdd.forEach(function (methodToAdd) {
            methodToAdd(client, chai, utils, options);
        });
    };
}
