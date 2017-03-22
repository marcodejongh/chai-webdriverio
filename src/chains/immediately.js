export default function immediately(client, chai, utils) {
    chai.Assertion.addProperty('immediately', function() {
        utils.flag(this, 'immediately', true);
    });
}
