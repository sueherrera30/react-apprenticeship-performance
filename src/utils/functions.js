export const debounce = (func, time) => {
  let debounceHandler;
  return function () {
    clearTimeout(debounceHandler);
    debounceHandler = setTimeout(() => func.apply(this, arguments), time);
  };
};

export const throttle = (func, time) => {
  let inThrottle;
  return function () {
    if (!inThrottle) {
      func.apply(this, arguments);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), time);
    }
  };
};
