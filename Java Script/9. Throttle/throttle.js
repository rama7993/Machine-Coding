function throttle(func, limit) {
    var lastCall = 0;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var now = Date.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }
    };
}
var throttledLog = throttle(function () {
    console.log("Throttled:", new Date().toLocaleTimeString());
}, 1000);
var intervalId = setInterval(throttledLog, 100); // call every 100ms
setTimeout(function () { return clearInterval(intervalId); }, 5000); // stop after 5s
