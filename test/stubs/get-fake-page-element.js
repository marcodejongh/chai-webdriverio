import sinon from 'sinon';

export default function getFakePageElement() {
    return {
        type: 'Never gonna run around and desert you',
        message: 'Never gonna make you cry',
        state: 'Never gonna say goodbye',
        sessionId: 'Never gonna tell a lie and hurt you',
        value: 'We\'ve known each other for so long',
        selector: 'Your heart\'s been aching, but you\'re too shy to say it',
        someOtherKey: 'Inside, we both know what\'s been going on',
        yetAnotherKey: 'We know the game and we\'re gonna play it',
        waitForExists: sinon.stub(),
        isExisting: sinon.stub()
    };
}
