export default function assertElementExists(client, selector) {
    try {
        client.waitForExist(selector);
    } catch (error) {
        throw new Error(`Could not find element with selector ${selector}`);
    }
}
