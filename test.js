const lolex = require('lolex');

const startTimer = require('./');

const ONE_SECOND    = 1000;
const THREE_SECONDS = 3000;
const SEVEN_SECONDS = 7000;
const NINE_SECONDS  = 9000;
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

        test('More than 2 seconds left', () => {
            const futureTime = Date.now() + TEN_SECONDS;

            const stop = startTimer(futureTime, dummyCallback);

            clock.tick(SEVEN_SECONDS);

            const timeLeft = stop();

            expect(timeLeft).toEqual(THREE_SECONDS);
        });

        test('Less than 2 seconds left', () => {
            const futureTime = Date.now() + TEN_SECONDS;

            const stop = startTimer(futureTime, dummyCallback);

            clock.tick(NINE_SECONDS);

            const timeLeft = stop();

            expect(timeLeft).toEqual(ONE_SECOND);
        });
    });

    describe('jest', () => {
        beforeEach(() => {
            jest.useFakeTimers();
        });

        afterEach(() => {
            jest.clearAllTimers();
        });
        
        test('More than 2 seconds left', () => {
            const futureTime = Date.now() + TEN_SECONDS;

            const stop = startTimer(futureTime, dummyCallback);

            jest.advanceTimersByTime(SEVEN_SECONDS);

            const timeLeft = stop();

            expect(timeLeft).toEqual(THREE_SECONDS);
        });

        test('Less than 2 seconds left', () => {
            const futureTime = Date.now() + TEN_SECONDS;

            const stop = startTimer(futureTime, dummyCallback);

            jest.advanceTimersByTime(NINE_SECONDS);

            const timeLeft = stop();

            expect(timeLeft).toEqual(ONE_SECOND);
        });
    });
});
