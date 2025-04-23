function debounce(fn, delay) {
  var timer;
  return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(void 0, args);
    }, delay);
  };
}
