export default function immediately(client, chai, utils) {
    chai.Assertion.addChainableMethod('immediately', function() {
        utils.flag(this, 'immediately', true);
    });
}
