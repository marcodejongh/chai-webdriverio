# Change Log

## Unreleased Changes:

**Breaking Changes:**
- elementExists not requires 4 arguments instead of 3, to account for defaultWait time.
- all assertions except `there` will now throw an error when the element doesn't exist, even when negated (`value` and `focus` did not fail when negated, previously)

**Added features:**
- added `defaultWait` configuration to make `immediately` work as intended
  - this is provided to the main initializer (`require('chai-webdriverio').default`) which now accepts an `options` object as the last (optional) argument

## 0.3.0:

Changelog not present up to this version (see commit history)
