# chai-webdriverio

Provides [webdriverio](https://npmjs.org/package/webdriverio) sugar for the [Chai](http://chaijs.com/) assertion library. Allows you to create expressive integration tests:

```javascript
expect('.frequency-field').to.have.text('One time')
expect('.toggle-pane').to.not.be.visible()
```

## What sorts of assertions can we make?

All assertions start with a css-selector, for example:

- `expect('.list')`
- `expect('div > h1')`
- `expect('a[href=http://google.com]')`

Then we add the dom flag, like so:

- `expect(selector).dom`

Finally, we can add our assertion to the chain.

- `expect(selector).to.have.text('string')` - Test the text value of the dom against supplied string. Exact matches only.
- `expect(selector).dom.to.have.text('regex')` - Test the text value of the dom against. Exact matches only.
- `expect(selector).dom.to.be.visible()` - Check whether or not the element is visible.
- `expect(selector).dom.to.have.count(number)` - Test how many elements exist in the dom with the supplied selector

You can also always add a `not` in there to negate the assertion:

- `expect(selector).not.to.have.text('property')`

## Setup

Setup is pretty easy. Just:

```javascript
var chai = require('chai');
var chaiWebdriver = require('chai-webdriverio');
chai.use(chaiWebdriver(browser));

// And you're good to go!
browser.url('http://github.com');
chai.expect('#site-container h1.heading').to.not.contain.text("I'm a kitty!");
```

## Contributing

so easy.

```bash
npm install           # download the neccesary development dependencies
npm run transpile     # compile ES6 into javascript
npm test              # build and run the specs
```

## License

Apache 2.0

## Thanks
Thanks to [goodeggs](https://github.com/goodeggs/) for creating: [chai-webdriver](https://github.com/marcodejongh/chai-webdriverio) which inspired this module.
