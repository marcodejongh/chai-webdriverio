# chai-webdriverio ![Travis badge](https://travis-ci.org/marcodejongh/chai-webdriverio.svg?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/marcodejongh/chai-webdriverio.svg)](https://greenkeeper.io/)



Provides [webdriverio](https://npmjs.org/package/webdriverio) sugar for the [Chai](http://chaijs.com/) assertion library. Allows you to create expressive integration tests:

```javascript
expect('.frequency-field').to.have.text('One time')
expect('.toggle-pane').to.not.be.displayed()
```

## What sorts of assertions can we make?

All assertions start with a [WebdriverIO-compatible selector](http://webdriver.io/guide/usage/selectors.html), for example:

- `expect('.list')` (CSS selector)
- `expect('a[href=http://google.com]')` (CSS Selector)
- `expect('//BODY/DIV[6]/DIV[1]')` (XPath selector)
- `expect('a*=Save')` (Text selector)

Then, we can add our assertion to the chain.

- `expect(selector).to.be.there()` - Test whether [at least one] matching element exists in the DOM
- `expect(selector).to.be.displayed()` - Test whether or not [at least one] matching element is displayed
- `expect(selector).to.have.text('string')` - Test the text value of the selected element(s) against supplied string. Succeeds if at least one element matches exactly
- `expect(selector).to.have.text(/regex/)` - Test the text value of the selected element(s) against the supplied regular expression. Succeeds if at least one element matches
- `expect(selector).to.have.count(number)` - Test how many elements exist in the DOM with the supplied selector
- `expect(selector).to.have.value('x')` - Test that [at least one] selected element has the given value
- `expect(selector).to.have.focus()` - Test that [at least one] selected element has focus

You can also always add a `not` in there to negate the assertion:

- `expect(selector).not.to.have.text('property')`

## Setup

Setup is pretty easy. Just:

```javascript
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio').default;
chai.use(chaiWebdriver(browser));

// And you're good to go!
browser.url('http://github.com');
chai.expect('#site-container h1.heading').to.not.contain.text("I'm a kitty!");
```

## Default Wait Time

As an optional argument to the initializer, you can add an `options` object in this format:

```javascript
var options = {defaultWait: 500} // 500ms
chai.use(chaiWebdriver(browser, options));
```

The `defaultWait` parameter will cause chai-webdriverio to wait the specified number of milliseconds
for a given selector to appear before failing (if it is not yet present on the page).  You can use `immediately`
to skip this default wait time:

```javascript
expect(selector).to.immediately.have.text('string'); // fails immediately if element is not found
```

**Beware:** For `immediately` to work, your [implicit wait time in WebdriverIO](http://webdriver.io/guide/testrunner/timeouts.html#Session-Implicit-Wait-Timeout)
must be set to 0.  The immediately flag has no way to skip WebdriverIO's implicit wait.

## Compatability

### WebdriverIO
| WebdriverIO version | Compatible `chai-webdriverio` version |
| ---- | ---- |
| 5.x.x | >= 1.0.0
| 4.x.x | 0.4.3

### Node.js

`chai-webdriverio` version >= 1.0.0 requires Node.js 8.x

## Contributing

so easy.

```bash
npm                # download the necessary development dependencies
npm transpile      # compile ES6 into javascript
npm test           # build and run the specs
```

**Contributors:**

* [@mltsy](https://github.com/mltsy) : `exist`, `text` assertions, documentation & test adjustments

## License

Apache 2.0

## Thanks
Thanks to [goodeggs](https://github.com/goodeggs/) for creating: [chai-webdriver](https://github.com/goodeggs/chai-webdriver) which inspired this module.
