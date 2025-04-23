function throttle(func: Function, limit: number): Function {
  let lastCall = 0;

  return function (...args: any[]): void {
    const now = Date.now();

    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
}

const throttledLog = throttle(() => {
  console.log("Throttled:", new Date().toLocaleTimeString());
}, 1000);

let intervalId = setInterval(throttledLog, 100); // call every 100ms

setTimeout(() => clearInterval(intervalId), 5000); // stop after 5s
