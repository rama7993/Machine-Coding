function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    //console.log(args);
    timer = setTimeout(() => fn(...args), delay);
  };
}

const debouncedFunction = debounce((msg) => console.log(msg), 1000);
debouncedFunction("Hello World!"); // Executes after 1 second if no further calls are made within that time.
debouncedFunction("Another message!"); // Resets the timeout, so the previous message is not logg
