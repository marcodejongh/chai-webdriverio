/// <reference types="webdriverio" />
/// <reference types="chai" />

declare namespace Chai {
    interface Assertion {
        count: (count: number) => void;
        focus: () => void;
        text: (expected: string|number|RegExp) => void;
        there: () => void;
        value: (expected: string|number|RegExp) => void;
        displayed: () => void;
        enabled: () => void;
        immediately: Assertion;
    }
}

declare module 'chai-webdriverio' {
    function chaiWebdriverIO(client: WebdriverIO.Client<void>, options?: any): (chai: any, utils: any) => void;
    export = chaiWebdriverIO;
}