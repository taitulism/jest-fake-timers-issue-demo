/***************************
 See README.md for details
****************************/
function setTimer (ms, callback) {
    const now = Date.now();
    const futureTimestamp = now + ms;

    const ref = setTimeout(() => {
        callback();
    }, ms);

    return function stop () {
        clearTimeout(ref);

        return getTimeLeft(futureTimestamp);
    };
}

function getTimeLeft (futureTimestamp) {
    const now = Date.now();
    const timeLeft = futureTimestamp - now;

    return timeLeft;
}

module.exports = setTimer;
