import { useCallback, useRef } from "react";

const useDebounce = (fn: (...args: any[]) => void, delay = 500) => {
  const timerRef = useRef<number | null>(null);

  const debouncedFn = useCallback(
    (...args: any[]) => {
      if (timerRef.current !== null) {
        clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        fn(...args);
        timerRef.current = null;
      }, delay);
    },
    [fn, delay]
  );

  return debouncedFn;
};

export default useDebounce;
