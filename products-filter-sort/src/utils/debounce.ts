export const debounce = (
  fn: (...args: any[]) => void,
  delay: number = 1000
) => {
  let timerId: number | null = null;

  function debounced(...args: any[]) {
    if (timerId) {
      clearTimeout(timerId);
    }

    timerId = window.setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  }

  debounced.cancel = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };

  debounced.flush = function (...args: any[]) {
    if (timerId) {
      fn(...args);
      clearTimeout(timerId);
      timerId = null;
    }
  };

  return debounced;
};
