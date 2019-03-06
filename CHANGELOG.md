# Change Log

## 1.0.0:
**Breaking changes** 
- `.visible()` is renamed to `.displayed()` to be in line with new WebdriverIO wording
- Requires NodeJS 8 or newer

**Added feature**
- Compatability with WebdriverIO v5
- TypeScript types are now shipped directly with the `chai-webdriverio` package

**Bug Fixes:**
- `.focus()`, `.text()`, `.value()` exssertions do now wait until [at least one] selected element matches the assertion, not only until [at least one] element with the given selector exists.

## 0.4.3:
**Added feature:**
- added `enabled` assertion

## 0.4.2:

**Bug Fixes:**
- Use `waitForVisible` instead of `waitForExist` in `visible`
- Use `waitUntil` instead of `waitForExist` in `count`

## 0.4.1:

**Bug Fixes:**
- fix error in `visible` assertion introduced in `0.4.0`

## 0.4.0:

**Breaking Changes:**
- elementExists not requires 4 arguments instead of 3, to account for defaultWait time.
- all assertions except `there` will now throw an error when the element doesn't exist, even when negated (`value` and `focus` did not fail when negated, previously)

**Added features:**
- added `defaultWait` configuration to make `immediately` work as intended
  - this is provided to the main initializer (`require('chai-webdriverio').default`) which now accepts an `options` object as the last (optional) argument

## 0.3.0:

Changelog not present up to this version (see commit history)
