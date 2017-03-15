export default function assertElementExists(client, selector, reverse) {
    try {
        client.waitForExist(selector, reverse);
    } catch (error) {
        throw new Error(`Could not find element with selector ${selector}`);
    }
}
