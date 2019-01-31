`jest` issue #2684 - Usecase
============================
[See Issue #2684](https://github.com/facebook/jest/issues/2684)

## Demo
Clone, install and run test
```sh
$ npm install
```
```sh
$ npm test
```

## Description
The module is a timer function that accepts a future timestamp and runs a callback when time has come.  
It returns a `stop` function that when called, clears the timeout but also returns how much time is left in milliseconds.
```js
const stop = setTimer(timestamp, callback)

//...

const timeleft = stop()
```

## The Test
Using both `jest` and `lolex` for comparison.
There are two test suites for both `jest` and `lolex`, each checks the following scenario:

1. Set the timer for 10 seconds.
2. "Wait" 7 seconds. (using `clock.tick` / `jest.advanceTimersByTime`)
3. Stop the timer and get the time left.
4. Expect 3 seconds left.

`lolex` passes, `jest` fails.

## The Issue
The `timeLeft` is calculated as follows:
```js
const now = Date.now();
const timeLeft = futureTimestamp - now;
```
Since `jest` doesn't mock the `Date` object, the test recieved value is 10 seconds (or a bit less if system is slow).

That means that the time for `Date.now` is not being "advanced" using `jest.advanceTimersByTime`.


