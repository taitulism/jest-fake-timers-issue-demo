/**************************************************************
 * Sets a timeout to a future timestamp.
 * Returns a `stop` function that when called, returns the
   number of milliseconds left to target timestamp.
 * Runs a callback when done.
***************************************************************/
function startTimer (futureTimestamp, callback) {
    const now = Date.now();
    const ms = futureTimestamp - now;

    const ref = setTimeout(() => {
        callback();
    }, ms);

    return function stop () {
        clearTimeout(ref);

        return getTimeLeft(futureTimestamp);
    };
}

function getTimeLeft (futureTimestamp) {
    const TWO_SECONDS = 2000;
    const now = Date.now();
    const timeLeft = futureTimestamp - now;

    return timeLeft;
}

module.exports = startTimer;
