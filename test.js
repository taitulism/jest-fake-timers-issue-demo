const lolex = require('lolex');

const setTimer = require('./');

const THREE_SECONDS = 3000;
const SEVEN_SECONDS = 7000;
const TEN_SECONDS   = 10000;

const dummyCallback = () => {};

describe('Fake Timers', () => {
    describe('lolex', () => {
        let clock;

        beforeEach(() => {
            clock = lolex.install();
        });

        afterEach(() => {
            clock.uninstall();
        });

        test('3 seconds left', () => {
            const stop = setTimer(TEN_SECONDS, dummyCallback);

            clock.tick(SEVEN_SECONDS);

            const timeLeft = stop();

            expect(timeLeft).toEqual(THREE_SECONDS);
        });
    });

    describe('jest', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.clearAllTimers();
        });
        
        test('3 seconds left', () => {
            const stop = setTimer(TEN_SECONDS, dummyCallback);

            jest.advanceTimersByTime(SEVEN_SECONDS);

            const timeLeft = stop();

            expect(timeLeft).toEqual(THREE_SECONDS);
        });
    });
});
