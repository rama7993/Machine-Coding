const throttle = (fn, delay) => {
  let flag = true;

  return (...args) => {
    if (!flag) return;

    fn(...args);
    flag = false;

    setTimeout(() => {
      flag = true;
    }, delay);
  };
};

const dateThrottle = (fn, delay) => {
  let last = 0;

  return (...args) => {
    const now = new Date().getTime();
    if (now - last < delay) return;
    fn.apply(this, args);
    last = now;
  };
};

const throttleFn = () => {
  console.log("Throttled Scroll Event Fired");
};

// document
//   .getElementById("box")
//   .addEventListener("scroll", throttle(throttleFn, 2000));

document
  .getElementById("box")
  .addEventListener("scroll", dateThrottle(throttleFn, 2000));
