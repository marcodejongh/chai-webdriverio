export default function assertElementExists(client, selector, defaultWait=0, reverse) {
  try {
      client.$(selector).waitForExist(defaultWait, reverse);
  } catch (error) {
      if (reverse) {
        throw new Error(`Element with selector <${selector}> still exists after ${defaultWait}ms (while waiting for it not to).`);
      } else {
        throw new Error(`Could not find element with selector <${selector}> within ${defaultWait}ms`);
      }
  }
}
